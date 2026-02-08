"use client";
import { useMemo, useState } from "react";
import FlyingChip from "./flying-chip";
import { MarketOutcomeButton } from "./market-outcome-button";

import MarketName from "./market-name";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { useCouponStore } from "@/store/coupon-store";
type MarketGroupProps = {
    event: GetSportsResponse[number];
    allowedGroups?: number[];
};


export type Market = NonNullable<GetSportsResponse[number]['markets']>[number];
export type OutcomesMatrix = Market['outcomes'];
export type Outcome = Market['outcomes'][number][number];

const MarketGroup = ({ event, allowedGroups }: MarketGroupProps) => {
    const addItem = useCouponStore(state => state.addItem);
    if (!event) return null;
    const { markets } = event;
    if (!markets) return null;
    const [flyItem, setFlyItem] = useState<{
        cursor: { x: number; y: number };
        label: string;
        coefficient: number;
    } | null>(null);

    const market = useMemo(() => {
        return markets[0];
    }, [markets]);
    const handleOutcomeClick = (outcome: Outcome, cursor: { x: number; y: number }) => {
        const { coefficient, id, name, point } = outcome;
        addItem({
            Coef: coefficient,
            GameId: event.id!,
            Kind: event.status === 'live' ? 1 : 3,
            Type: id,
            marketId: market.id,
            Param: point || 0,
            name,
            marketName: market.name,
            team: event.team
        });
        setFlyItem({
            cursor,
            label: outcome.name,
            coefficient: outcome.coefficient
        });
    };



    return (
        <>
            <div className="w-full md:w-[45%]">
                <div className="flex flex-col">
                    <MarketName name={market.name} />

                    <div className="flex items-center space-x-2">
                        {market.outcomes.map((items, index) =>
                            items.map((item) => {

                                const selectedKey = `${event.id!}-${market.id ?? 0}-${item.id ?? 0}-${item.point ?? 0}`
                                return (
                                    <MarketOutcomeButton
                                        key={`${markets[0].id}-${item.id}-${index}`}
                                        item={item}
                                        onClick={handleOutcomeClick}
                                        selectedKey={selectedKey}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* ✨ Flying element from cursor to bottom-right */}
            {flyItem && (
                <FlyingChip
                    cursor={flyItem.cursor}
                    label={flyItem.label}
                    coefficient={flyItem.coefficient}
                    onComplete={() => setFlyItem(null)}
                />
            )}
        </>
    );
};





export default MarketGroup;