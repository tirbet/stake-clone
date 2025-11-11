"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import FlyingChip from "./flying-chip";
import { MarketOutcomeButton } from "./market-outcome-button";
import type { MarketItem, SportEventItem } from "@/types/sport-type";
import { cn } from "@/lib/utils";
import MarketName from "./market-name";

type MarketGroupProps = {
    event: SportEventItem;
    allowedGroups: number[];
};




const MarketGroup = ({ event, allowedGroups }: MarketGroupProps) => {
    const t = useTranslations("market");
    const group = event.markets?.find((d) => allowedGroups.includes(d.id));
    const [flyItem, setFlyItem] = useState<{
        cursor: { x: number; y: number };
        label: string;
        coefficient: number;
    } | null>(null);

    if (!group) return null;

    const handleOutcomeClick = (outcome: MarketItem, cursor: { x: number; y: number }) => {
        const label = outcome.point
            ? t(`${group.id}.M.${outcome.id}`, { point: outcome.point })
            : t(`${group.id}.M.${outcome.id}`);

        setFlyItem({
            cursor,
            label,
            coefficient: outcome.coefficient
        });
    };

    return (
        <>
            <div className="w-full md:w-[45%]">
                <div className="flex flex-col">
                    <MarketName id={group.id} />

                    <div className="flex items-center space-x-2">
                        {group.outcomes.map((items, index) =>
                            items.map((item) => (
                                <MarketOutcomeButton
                                    key={`${group.id}-${item.id}-${index}`}
                                    item={item}
                                    group={group}
                                    eventId={event.CI}
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