import { Plus } from 'lucide-react'
import { EmptyStateProps } from './bet'

export default function EmptyBetSlip({
    onAddMockBet,
    bookingCode,
    onBookingCodeChange,
    onLoadBookedBet
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-10">
            <div className="w-16 h-16 bg-[#1f1f1f] rounded-full flex items-center justify-center mb-4 border border-[#2c2c2c]">
                <Plus className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-gray-300 font-semibold mb-1">
                Bet Slip is Empty
            </h3>
            <p className="text-xs text-gray-500 mb-5">
                Add selections to start betting
            </p>

            <button
                onClick={onAddMockBet}
                className="bg-gradient-to-r from-[#d68a1a] to-[#e09e2e] text-black font-semibold py-2 px-6 rounded-md text-sm hover:from-[#e09e2e] hover:to-[#f0b94a] transition-all mb-6"
            >
                Add Demo Bet
            </button>

            <div className="w-full">
                <label className="text-sm text-gray-400 block mb-2 text-left">
                    Load Booked Bet
                </label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={bookingCode}
                        onChange={(e) => onBookingCodeChange(e.target.value)}
                        placeholder="Booking Code"
                        className="flex-1 bg-[#1a1a1a] text-white px-3 py-2 rounded-md border border-[#2c2c2c] focus:border-[#d68a1a] outline-none placeholder-gray-600 text-sm"
                    />
                    <button
                        onClick={onLoadBookedBet}
                        disabled={!bookingCode.trim()}
                        className="bg-[#2a2a2a] text-gray-300 px-4 py-2 rounded-md hover:bg-[#d68a1a] hover:text-black transition-colors disabled:opacity-40"
                    >
                        Load
                    </button>
                </div>
            </div>
        </div>
    )
}