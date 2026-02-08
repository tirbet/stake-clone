import { Clock } from 'lucide-react'
import { useCouponStore } from '@/store/coupon-store';
import { formatValue } from "react-currency-input-field";
export default function BetSummary() {

  const coupons = useCouponStore(s => s.coupons);
  const handlePlaceBet = useCouponStore(s => s.handlePlaceBet);
  const totalPotentialWin = useCouponStore(s => s.getTotalPotentialWin());
  const totalStake = useCouponStore(s => s.getTotalStake());
  const hasInstrument = useCouponStore(s => s.hasInstrument());
  if (coupons.length === 0) return null

  const hasSuspended = coupons.some(c => c.suspended);
  const hasFinished = coupons.some(c => c.finish);
  const hasInvalidStake = coupons.some(c => !c.betAmount || c.betAmount <= 0);

  const isDisabled =
    coupons.length === 0 ||
    totalStake <= 0 ||
    hasSuspended ||
    hasFinished ||
    hasInvalidStake;
  const totalPotentialWinDisplay = formatValue({
    value: totalPotentialWin.toString(),
    groupSeparator: ',',
    decimalSeparator: '.',
    decimalScale: 2,
    prefix: '$',
  });
  const totalStakeDisplay = formatValue({
    value: totalStake.toString(),
    groupSeparator: ',',
    decimalSeparator: '.',
    decimalScale: 2,
    prefix: '$',
  });
  return (
    <div className="border-t border-[#2c2c2c] p-4 bg-[#141414]/95 backdrop-blur-md">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">Total Stake</span>
        <span className="text-white font-semibold">
          {totalStakeDisplay}
        </span>
      </div>
      <div className="flex justify-between text-sm mb-3">
        <span className="text-gray-400">Potential Win</span>
        <span className="text-green-400 font-bold">
          {totalPotentialWinDisplay}
        </span>
      </div>

      <button
        onClick={handlePlaceBet}
        disabled={isDisabled}
        className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-md hover:from-green-600 hover:to-green-700 transition-all disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed"
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