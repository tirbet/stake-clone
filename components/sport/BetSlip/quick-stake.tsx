import { QuickStakeProps } from './bet'

export default function QuickStake({ stakes, onStakeSelect }: QuickStakeProps) {
    return (
        <div>
            <label className="text-sm text-gray-400 block mb-2">
                Quick Stake
            </label>
            <div className="flex space-x-2">
                {stakes.map((stake) => (
                    <button
                        key={stake}
                        onClick={() => onStakeSelect(stake)}
                        className="flex-1 bg-[#1f1f1f] text-gray-300 py-2 rounded-md text-sm hover:bg-[#d68a1a] hover:text-black transition-all"
                    >
                        ${stake}
                    </button>
                ))}
            </div>
        </div>
    )
}