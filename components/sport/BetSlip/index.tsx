'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bet } from './bet'
import BetSlipHeader from './bet-slip-header'
import EmptyBetSlip from './empty-bet-slip'
import QuickStake from './quick-stake'
import BetCard from './bet-card'
import BetSummary from './bet-summary'
import { cn } from '@/lib/utils'
import { useCouponStore } from '@/store/coupon-store'

export default function BetSlip() {
    const coupons = useCouponStore(s => s.coupons);
    const isOpen = useCouponStore(s => s.isOpen);
    const [maxHeight, setMaxHeight] = useState(0)
    const [bets, setBets] = useState<Bet[]>([])
    const [quickStakes] = useState([10, 25, 50, 100])
    const slipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateHeight = () => setMaxHeight(window.innerHeight * 0.8)
        updateHeight()
        window.addEventListener('resize', updateHeight)
        return () => window.removeEventListener('resize', updateHeight)
    }, [])


    const handleQuickStake = (amount: number) =>
        setBets(
            bets.map((b) => ({
                ...b,
                stake: amount,
                potentialWin: amount * b.odds,
            }))
        )



    return (
        <div
            ref={slipRef}
            className={cn(
                "fixed bottom-16 md:bottom-0 right-0 z-50 w-full md:w-80",
                "bg-[#0f0f0f]/95 text-white shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-[#2c2c2c]/70",
                "rounded-t-2xl backdrop-blur-xl overflow-hidden",
                isOpen ? "sm:bottom-0" : ""
            )}
        >
            <BetSlipHeader />

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: maxHeight, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-transparent">
                                {coupons.length === 0 ? (
                                    <EmptyBetSlip />
                                ) : (
                                    <div className="p-4 space-y-4">
                                        {/* <QuickStake
                                            stakes={quickStakes}
                                            onStakeSelect={handleQuickStake}
                                        /> */}

                                        {coupons.map((bet, index) => (
                                            <BetCard
                                                key={`${bet.GameId} ${index}`}
                                                bet={bet}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <BetSummary />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}