import { Clock } from 'lucide-react'
import { BetSummaryProps } from './bet'

export default function BetSummary({ 
  totalStake, 
  totalPotentialWin, 
  betCount, 
  onPlaceBet 
}: BetSummaryProps) {
  if (betCount === 0) return null

  return (
    <div className="border-t border-[#2c2c2c] p-4 bg-[#141414]/95 backdrop-blur-md">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">Total Stake</span>
        <span className="text-white font-semibold">
          ${totalStake.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between text-sm mb-3">
        <span className="text-gray-400">Potential Win</span>
        <span className="text-green-400 font-bold">
          ${totalPotentialWin.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onPlaceBet}
        disabled={totalStake <= 0}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-md hover:from-green-600 hover:to-green-700 transition-all disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed"
      >
        PLACE BET
      </button>

      <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
        <Clock size={12} className="mr-1" />
        Bets expire in 15 minutes
      </div>
    </div>
  )
}