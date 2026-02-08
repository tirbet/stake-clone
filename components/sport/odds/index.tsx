import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon, LockIcon } from 'lucide-react';


import { MarketOutcomeButton } from './market-outcome-button';
import { GetSportsResponse } from '@/features/sport/api/use-get-sport';
import { useCouponStore } from '@/store/coupon-store';
type Team = GetSportsResponse[number]['team'];
export type Market = NonNullable<GetSportsResponse[number]['markets']>[number];
export type OutcomesMatrix = Market['outcomes'];
export type Outcome = Market['outcomes'][number][number];
type OddsProps = {
    market: Market;
    index: number;
    gameId: number | null;
    status: "live" | "upcoming"
    team: Team;

};

const getGridColsClass = (len: number) => {
    switch (len) {
        case 1:
            return "grid-cols-1";
        case 2:
            return "grid-cols-2";
        case 3:
            return "grid-cols-3";
        case 4:
            return "grid-cols-4";
        default:
            return "grid-cols-1"; // fallback
    }
};


export function Odds({ market, index, gameId, status, team }: OddsProps) {
    if (!gameId) return;
    const addItem = useCouponStore(state => state.addItem);
    const isSelectedFn = useCouponStore(s => s.isSelected);
    const [isOpen, setIsOpen] = useState(index < 3);
    const [flyItem, setFlyItem] = useState<{
        cursor: { x: number; y: number };
        label: string;
        coefficient: number;
    } | null>(null);




    const handleOutcomeClick = (outcome: Outcome, cursor: { x: number; y: number }) => {
        const { coefficient, id, name, point } = outcome;
        addItem({
            Coef: coefficient,
            GameId: gameId,
            Kind: status === 'live' ? 1 : 3,
            Type: id,
            marketId: market.id,
            Param: point || 0,
            name,
            marketName: market.name,
            team
        });
        setFlyItem({
            cursor,
            label: outcome.name,
            coefficient: outcome.coefficient
        });
    };
    return (
        <div className="flex items-center justify-center font-sans">
            <div className="w-full bg-betslip mt-2 max-w-full text-white shadow-lg overflow-hidden">
                <header
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex justify-between items-center bg-betslip p-2 border-b border-slate-700 cursor-pointer"
                >
                    <h2 className="text-sm font-semibold text-gray-100">{market.name}</h2>
                    <div className="flex items-center space-x-2">
                        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </div>
                </header>

                <div
                    className={cn(
                        'transition-all duration-300 ease-in-out grid',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                >
                    <div className="overflow-hidden">
                        <main className="p-4">
                            <div className={cn(
                                "grid gap-1 md:gap-4",
                                getGridColsClass(market.outcomes.length)
                            )}>
                                {market.outcomes.map((column, colIndex) => (
                                    <div key={`column-${colIndex}`} className="flex flex-col gap-2">
                                        {column.map((outcome, rowIndex) => {
                                            const selectedKey = `${gameId}-${market.id ?? 0}-${outcome.id ?? 0}-${outcome.point ?? 0}`
                                            return (
                                                <MarketOutcomeButton
                                                    key={`${market.id}-${outcome.id}-${rowIndex}`}
                                                    item={outcome}
                                                    onClick={handleOutcomeClick}
                                                    selectedKey={selectedKey}
                                                />
                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}