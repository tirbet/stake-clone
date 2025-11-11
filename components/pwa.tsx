'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '@/lib/pwa';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export const PushNotificationManager = () => {
    const [isSupported, setIsSupported] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(
        null
    )
    const [message, setMessage] = useState('')

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true)
            registerServiceWorker()
        }
    }, [])

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        })
        const sub = await registration.pushManager.getSubscription()
        setSubscription(sub)
    }

    async function subscribeToPush() {
        try {
            const registration = await navigator.serviceWorker.ready
            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
                ),
            })
            setSubscription(sub)
            const serializedSub = JSON.parse(JSON.stringify(sub))
            await subscribeUser(serializedSub)
        } catch (err) {
            console.error('Push subscription failed:', err)
            alert('Push subscription failed. Make sure your browser supports push and you are on HTTPS.')
        }
    }


    async function unsubscribeFromPush() {
        await subscription?.unsubscribe()
        setSubscription(null)
        await unsubscribeUser()
    }

    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message)
            setMessage('')
        }
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>
    }

    return (
        <div>
            <h3>Push Notifications</h3>
            {subscription ? (
                <>
                    <p>You are subscribed to push notifications.</p>
                    <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                    <input
                        type="text"
                        placeholder="Enter notification message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendTestNotification}>Send Test</button>
                </>
            ) : (
                <>
                    <p>You are not subscribed to push notifications.</p>
                    <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    )
}


export const InstallPrompt = () => {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        )
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setVisible(true)
        }

        window.addEventListener('beforeinstallprompt', handler)

        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const choiceResult = await deferredPrompt.userChoice
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt')
            } else {
                console.log('User dismissed the install prompt')
            }
            setDeferredPrompt(null)
            setVisible(false)
        }
    }

    if (isStandalone || (!visible && !isIOS)) return null

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-4 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col items-center space-y-2 max-w-xs">
            <h4 className="font-bold text-sm md:text-base">Install Stake</h4>
            {!isIOS && deferredPrompt && (
                <button
                    onClick={handleInstallClick}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md text-sm md:text-base font-medium"
                >
                    Add to Home Screen
                </button>
            )}
            {isIOS && (
                <p className="text-xs text-center leading-snug">
                    To install this app on your iOS device, tap the share button{' '}
                    <span role="img" aria-label="share">
                        ⎋
                    </span>{' '}
                    and then "Add to Home Screen"{' '}
                    <span role="img" aria-label="plus">
                        ➕
                    </span>
                    .
                </p>
            )}
        </div>
    )
}
