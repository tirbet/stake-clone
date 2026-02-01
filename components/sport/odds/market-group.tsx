"use client";
import { useState } from "react";
import FlyingChip from "./flying-chip";
import { MarketOutcomeButton } from "./market-outcome-button";

import MarketName from "./market-name";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
type MarketGroupProps = {
    event: GetSportsResponse[number];
    allowedGroups?: number[];
};


export type Market = NonNullable<GetSportsResponse[number]['markets']>[number];
export type OutcomesMatrix = Market['outcomes'];
export type Outcome = Market['outcomes'][number][number];

const MarketGroup = ({ event, allowedGroups }: MarketGroupProps) => {
    const { markets } = event;
    if(!markets) return null;
    const [flyItem, setFlyItem] = useState<{
        cursor: { x: number; y: number };
        label: string;
        coefficient: number;
    } | null>(null);


    const handleOutcomeClick = (outcome: Outcome, cursor: { x: number; y: number }) => {
     
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
                    <MarketName name={markets[0]?.name} />

                    <div className="flex items-center space-x-2">
                        {markets[0].outcomes.map((items, index) =>
                            items.map((item) => (
                                <MarketOutcomeButton
                                    key={`${markets[0].id}-${item.id}-${index}`}
                                    item={item}
                                    onClick={handleOutcomeClick}
                                />
                            ))
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