import { X } from 'lucide-react'
import { BetCardProps } from './bet'

export default function BetCard({ bet, onRemove, onStakeChange }: BetCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-3 border border-[#2c2c2c]/80 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
            {bet.event}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {bet.market} — {bet.selection}
          </p>
        </div>
        <button
          onClick={() => onRemove(bet.id)}
          className="text-gray-500 hover:text-red-500 transition-colors ml-2"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex justify-between items-center text-sm mb-2">
        <span className="text-gray-400">Odds</span>
        <span className="text-[#d68a1a] font-semibold">
          {bet.odds.toFixed(2)}
        </span>
      </div>

      <div className="mb-2">
        <label className="text-xs text-gray-500 block mb-1">
          Stake
        </label>
        <input
          type="number"
          value={bet.stake || ''}
          onChange={(e) =>
            onStakeChange(bet.id, parseFloat(e.target.value) || 0)
          }
          placeholder="0.00"
          className="w-full bg-[#0f0f0f] text-white px-3 py-2 rounded-md border border-[#2c2c2c] focus:border-[#d68a1a] outline-none text-sm"
        />
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Potential Win</span>
        <span className="text-green-400 font-semibold">
          ${bet.potentialWin.toFixed(2)}
        </span>
      </div>
    </div>
  )
}