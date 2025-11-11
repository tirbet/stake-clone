'use server'

import webpush, { PushSubscription,  } from 'web-push'

// Initialize web-push with your VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// For demo, use in-memory storage (replace with DB in production)
let subscriptions: PushSubscription[] = []

export async function subscribeUser(sub: PushSubscription) {
  // Avoid duplicate subscriptions
  if (!subscriptions.find((s) => s.endpoint === sub.endpoint)) {
    subscriptions.push(sub)
  }
  return { success: true }
}

export async function unsubscribeUser(sub?: PushSubscription) {
  if (!sub) {
    // Clear all (optional)
    subscriptions = []
  } else {
    subscriptions = subscriptions.filter((s) => s.endpoint !== sub.endpoint)
  }
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscriptions.length) {
    throw new Error('No subscriptions available')
  }

  const payload = JSON.stringify({
    title: 'StakeClone Notification',
    body: message,
    icon: '/icon.png', // 192x192 recommended
  })

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(sub, payload).catch((err) => {
        console.error('Failed to send to subscription:', sub.endpoint, err)
        return null
      })
    )
  )

  return { success: true, results }
}
