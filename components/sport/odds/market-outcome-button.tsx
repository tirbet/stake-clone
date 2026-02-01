"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import CoefficientWithIndicator from "./coefficient-with-indicator";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
type Market = NonNullable<GetSportsResponse[number]['markets']>[number];
type OutcomesMatrix = Market['outcomes'];
type Outcome = Market['outcomes'][number][number];
type MarketGroup = NonNullable<GetSportsResponse[number]['groups']>[number]

interface MarketOutcomeButtonProps {
    item:  Outcome;
    eventId?: number;
    onClick: (outcome: Outcome, cursor: { x: number; y: number }) => void;
}

export const MarketOutcomeButton = ({
    item,
    eventId,
    onClick,
}: MarketOutcomeButtonProps) => {

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
            className={cn(
                "bg-[#13202B]  text-white text-center hover:bg-[#1a2d3c]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "px-2 py-2 text-xs",
                "sm:px-3 sm:py-2 sm:text-sm",
                "w-full flex items-center justify-between rounded-md transition-colors"
            )}
            whileTap={{ scale: 0.95 }}
        >
            <span>{item.name}</span>
            <span
                className={cn(
                    "font-bold transition-colors ml-2 min-w-12 text-right",
                    item.suspended ? "text-white" : "text-blue-400"
                )}
            >
                <CoefficientWithIndicator
                    currentValue={item.coefficient}
                    isSuspended={item.suspended || false}
                />
            </span>
        </motion.button>
    );
};