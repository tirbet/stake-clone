import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'

interface BetSlipHeaderProps {
    isOpen: boolean
    betCount: number
    onToggle: () => void
    onClearAll: () => void
}

export default function BetSlipHeader({
    isOpen,
    betCount,
    onToggle,
    onClearAll
}: BetSlipHeaderProps) {

    
    return (
        <div
            className="bg-gradient-to-r from-[#d68a1a] to-[#e09e2e] px-5 py-3 flex justify-between items-center cursor-pointer rounded-t-2xl select-none"
            onClick={onToggle}
        >
            <div className="flex items-center space-x-2">
                <span className="font-bold text-[13px] tracking-wide text-black">
                    BET SLIP
                </span>
                {betCount > 0 && (
                    <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                        {betCount}
                    </span>
                )}
            </div>

            <div className="flex items-center space-x-2">
                {betCount > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onClearAll()
                        }}
                        className="text-black hover:text-red-700 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-black" />
                ) : (
                    <ChevronUp className="w-4 h-4 text-black" />
                )}
            </div>
        </div>
    )
}