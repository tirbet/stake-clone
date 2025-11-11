"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import CoefficientWithIndicator from "./coefficient-with-indicator";
import type { MarketGroup } from "@/types/sport-type";
import { Outcome } from "@/lib/sport/sport-utils";


interface MarketOutcomeButtonProps {
    item: Outcome;
    group: MarketGroup;
    eventId: number;
    onClick: (outcome: Outcome, cursor: { x: number; y: number }) => void;
}

export const MarketOutcomeButton = ({
    item,
    group,
    eventId,
    onClick,
}: MarketOutcomeButtonProps) => {
    const t = useTranslations("market");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Get the exact click position
        const cursor = {
            x: e.clientX,
            y: e.clientY
        };
        onClick(item, cursor);
    };

    return (
        <motion.button
            onClick={handleClick}
            disabled={item.suspended || false}
            className="w-full flex items-center justify-between bg-[#13202B] px-3 py-2 rounded-md text-sm text-white text-center hover:bg-[#1a2d3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.95 }}
        >
            {item.ps ? (
                <>{item.ps.length === 1 ? (<>
                    <div>{t(`${group.id}.M.${item.id}`, { point: item.pl ? item.pl.N : String(item.ps[0]) })}</div>
                </>) : (<>
                    <div>{t(`${group.id}.M.${item.id}`, { point: item.ps[0], pointB: item.ps[1] })}</div>
                </>)}</>
            ) : (
                <div>
                    
                    {item.pl ? (<>{t(`${group.id}.M.${item.id}`, { point: item.pl.N })}</>) : (<>{t(`${group.id}.M.${item.id}`)}</>)}

                </div>
            )}
            <span
                className={cn(
                    "font-bold transition-colors ml-2 min-w-[3rem] text-right",
                    false ? "text-white" : "text-blue-400"
                )}
            >
                <CoefficientWithIndicator
                    currentValue={item.coefficient}
                    isSuspended={item.suspended || false}
                    outcomeKey={`${item.id}-${group.id}-${eventId}`}
                />
            </span>
        </motion.button>
    );
};