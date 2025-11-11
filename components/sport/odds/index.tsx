import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon, LockIcon } from 'lucide-react';

import { useTranslations } from 'next-intl';
import type { MarketItem, SportEventItem } from '@/types/sport-type';
import { GameGroup } from "@/types/sport-type";
import { MarketOutcomeButton } from './market-outcome-button';

type OddsProps = {
    market: SportEventItem['markets'][0];
    index: number;
    eventId: number;
    group: GameGroup | null;
};

const colClassMap: Record<number, string> = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
};



export function Odds({ market, index, eventId, group }: OddsProps) {
    const t = useTranslations('market');
    const [isOpen, setIsOpen] = useState(index < 3);
    const colClass = colClassMap[market.outcomes.length] || 'sm:grid-cols-1';
    const [flyItem, setFlyItem] = useState<{
        cursor: { x: number; y: number };
        label: string;
        coefficient: number;
    } | null>(null);




    const handleOutcomeClick = (outcome: MarketItem, cursor: { x: number; y: number }) => {
        const label = outcome.point
            ? t(`${market.id}.M.${outcome.id}`, { point: outcome.point })
            : t(`${market.id}.M.${outcome.id}`);

        setFlyItem({
            cursor,
            label,
            coefficient: outcome.coefficient
        });
    };
    const marketIds = [998, 1044]
    return (
        <div className="flex items-center justify-center font-sans">
            <div className="w-full bg-betslip mt-2 max-w-full text-white shadow-lg overflow-hidden">
                <header
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex justify-between items-center bg-betslip p-2 border-b border-slate-700 cursor-pointer"
                >
                    <h2 className="text-sm font-semibold text-gray-100">{marketIds.includes(market.id) ? (
                        <>{t(`${market.id}.GN.${market.gs}`)}</>
                    ) : (
                        <>{t(`${market.id}.N`)}</>
                    )} {group?.name} - {market.id}</h2>
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
                            <div className={cn('grid grid-cols-1 gap-4', colClass)}>
                                {market.outcomes.map((column, colIndex) => (
                                    <div key={`column-${colIndex}`} className="flex flex-col gap-2">
                                        {column.map((outcome, rowIndex) => (
                                            <MarketOutcomeButton
                                                key={`${market.id}-${outcome.id}-${rowIndex}`}
                                                item={outcome}
                                                group={market}
                                                eventId={eventId}
                                                onClick={handleOutcomeClick}
                                            />
                                        ))}
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