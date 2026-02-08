"use client";
import { DollarSignIcon, X } from 'lucide-react'
import { CouponItem } from "@/store/coupon-store"
import { useCouponStore } from '@/store/coupon-store'
import { useTeamsDisplayName } from '@/lib/sport/sport-helper';
import CoefficientWithIndicator from '../odds/coefficient-with-indicator';
import { formatValue } from "react-currency-input-field";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function BetCard({ bet }: { bet: CouponItem }) {
  const removeItem = useCouponStore(s => s.removeItem);
  const setBetAmount = useCouponStore(s => s.setBetAmount);
  const stake = bet.betAmount ?? 0;
  const coef = bet.serverCoef ?? bet.Coef ?? 0;

  const potentialWin = formatValue({
    value: (stake * coef).toString(),
    groupSeparator: ',',
    decimalSeparator: '.',
    decimalScale: 2,
    prefix: '$',
  });
  const isDisable = bet.suspended || bet.finish
  return (
    <div className={cn("bg-[#1a1a1a] rounded-lg p-3 border border-[#2c2c2c]/80 shadow-sm", {
      "opacity-60": isDisable,
    })}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
            {useTeamsDisplayName(bet.team, 6)}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {bet.marketName}: {bet.name}
          </p>
        </div>
        <button
          onClick={() => removeItem(bet.GameId, bet.marketId!, bet.Type, bet.Param ?? 0)}
          className="text-gray-500 hover:text-red-500 transition-colors ml-2"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex justify-between items-center text-sm mb-2">
        <span className="text-gray-400">Odds</span>
        <span className="text-[#d68a1a] font-semibold">

          <CoefficientWithIndicator
            currentValue={bet.Coef}
            isSuspended={false}
          />
        </span>
      </div>

      <div className="mb-2 flex gap-1 items-center justify-center">
        <Label
          htmlFor={`currency-input-${bet.GameId}-${bet.marketId}-${bet.Type}-${bet.Param}`}
          className="text-xl text-gray-500 block mb-1">
          Stake
        </Label>
        <div className="relative">
          <DollarSignIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            disabled={isDisable}
            className="bg-[#0f0f0f] text-white pl-9"
            id={`currency-input-${bet.GameId}-${bet.marketId}-${bet.Type}-${bet.Param}`}
            min="0"
            placeholder="0.00"
            step="0.01"
            type="number"
            onChange={(e) => {
              setBetAmount(
                bet.GameId,
                bet.marketId!,
                bet.Type,
                bet.Param,
                e.target.value
              );
            }}
          />
        </div>

      </div>


      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Potential Win</span>
        <span className="text-green-400 font-semibold">
          {potentialWin}
        </span>
      </div>
    </div>
  )
}