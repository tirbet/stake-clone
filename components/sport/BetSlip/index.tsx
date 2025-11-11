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

export default function BetSlip() {

    const [isOpen, setIsOpen] = useState(false)
    const [maxHeight, setMaxHeight] = useState(0)
    const [bets, setBets] = useState<Bet[]>([])
    const [bookingCode, setBookingCode] = useState('')
    const [quickStakes] = useState([10, 25, 50, 100])
    const [totalStake, setTotalStake] = useState(0)
    const [totalPotentialWin, setTotalPotentialWin] = useState(0)
    const slipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateHeight = () => setMaxHeight(window.innerHeight * 0.8)
        updateHeight()
        window.addEventListener('resize', updateHeight)
        return () => window.removeEventListener('resize', updateHeight)
    }, [])

    useEffect(() => {
        const stake = bets.reduce((s, b) => s + b.stake, 0)
        const potential = bets.reduce((s, b) => s + b.potentialWin, 0)
        setTotalStake(stake)
        setTotalPotentialWin(potential)
    }, [bets])

    const addMockBet = () => {
        const newBet: Bet = {
            id: Date.now().toString(),
            event: 'Manchester United vs Liverpool',
            market: 'Match Winner',
            selection: 'Manchester United',
            odds: 2.5,
            stake: 0,
            potentialWin: 0,
        }
        setBets([...bets, newBet])
    }

    const removeBet = (id: string) => setBets(bets.filter((b) => b.id !== id))

    const updateStake = (id: string, stake: number) =>
        setBets(
            bets.map((b) =>
                b.id === id ? { ...b, stake, potentialWin: stake * b.odds } : b
            )
        )

    const handleQuickStake = (amount: number) =>
        setBets(
            bets.map((b) => ({
                ...b,
                stake: amount,
                potentialWin: amount * b.odds,
            }))
        )

    const loadBookedBet = () => {
        if (bookingCode.trim()) {
            addMockBet()
            setBookingCode('')
        }
    }

    const clearAllBets = () => setBets([])

    const handlePlaceBet = () => {
        // Handle bet placement logic here
        console.log('Placing bet:', { bets, totalStake, totalPotentialWin })
        // You can add API call or other logic here
    }

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
            <BetSlipHeader
                isOpen={isOpen}
                betCount={bets.length}
                onToggle={() => setIsOpen(!isOpen)}
                onClearAll={clearAllBets}
            />

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
                                {bets.length === 0 ? (
                                    <EmptyBetSlip
                                        onAddMockBet={addMockBet}
                                        bookingCode={bookingCode}
                                        onBookingCodeChange={setBookingCode}
                                        onLoadBookedBet={loadBookedBet}
                                    />
                                ) : (
                                    <div className="p-4 space-y-4">
                                        <QuickStake
                                            stakes={quickStakes}
                                            onStakeSelect={handleQuickStake}
                                        />

                                        {bets.map((bet) => (
                                            <BetCard
                                                key={bet.id}
                                                bet={bet}
                                                onRemove={removeBet}
                                                onStakeChange={updateStake}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <BetSummary
                                totalStake={totalStake}
                                totalPotentialWin={totalPotentialWin}
                                betCount={bets.length}
                                onPlaceBet={handlePlaceBet}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}