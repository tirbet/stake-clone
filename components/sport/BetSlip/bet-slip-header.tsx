import { cn } from '@/lib/utils';
import { useCouponStore } from '@/store/coupon-store'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'


export default function BetSlipHeader() {

    const coupons = useCouponStore(s => s.coupons);
    const isOpen = useCouponStore(s => s.isOpen);
    const betMode = useCouponStore(s => s.betMode);
    const setIsOpen = useCouponStore(s => s.setIsOpen);
    const onClearAll = useCouponStore(s => s.onClearAll);
    const setBetMode = useCouponStore(s => s.setBetMode);

    return (
        <div
            className="bg-linear-to-r from-[#d68a1a] to-[#e09e2e] px-5 py-3 flex justify-between items-center cursor-pointer rounded-t-2xl select-none"
            onClick={setIsOpen}
        >
            <div className="flex items-center space-x-2">
                {coupons.length > 1 ?
                    (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex bg-black/20 rounded-md overflow-hidden"
                        >
                            <button
                                onClick={() => setBetMode("single")}
                                className={cn(
                                    "px-3 py-1 text-xs font-semibold transition",
                                    betMode === "single"
                                        ? "bg-black text-white"
                                        : "text-black hover:bg-black/10"
                                )}
                            >
                                SINGLE
                            </button>

                            <button
                                onClick={() => setBetMode("multi")}
                                className={cn(
                                    "px-3 py-1 text-xs font-semibold transition",
                                    betMode === "multi"
                                        ? "bg-black text-white"
                                        : "text-black hover:bg-black/10"
                                )}
                            >
                                MULTI
                            </button>
                        </div>
                    ) :
                    (
                        <>
                            <span className="font-bold text-[13px] tracking-wide text-black">
                                BET SLIP
                            </span>
                            {coupons.length > 0 && (
                                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                    {coupons.length}
                                </span>
                            )}
                        </>
                    )
                }

            </div>

            <div className="flex items-center space-x-2">
                {coupons.length > 0 && (
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
        </div >
    )
}