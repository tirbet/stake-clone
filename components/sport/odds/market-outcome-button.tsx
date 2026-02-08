"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import CoefficientWithIndicator from "./coefficient-with-indicator";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { useCouponStore } from "@/store/coupon-store";
type Market = NonNullable<GetSportsResponse[number]['markets']>[number];

type Outcome = Market['outcomes'][number][number];


interface MarketOutcomeButtonProps {
    item: Outcome;
    onClick: (outcome: Outcome, cursor: { x: number; y: number }) => void;
    selectedKey: string;
}

export const MarketOutcomeButton = ({
    item,
    onClick,
    selectedKey,
}: MarketOutcomeButtonProps) => {

    const keyItems = useCouponStore(s => s.selectedSet)
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Get the exact click position
        const cursor = {
            x: e.clientX,
            y: e.clientY
        };
        onClick(item, cursor);
    };
    const isSelected = keyItems.has(selectedKey) 
    return (
        <motion.button
            onClick={handleClick}
            disabled={item.suspended || false}
            className={cn(
                "text-white text-center",
                "px-2 py-2 text-xs",
                "sm:px-3 sm:py-2 sm:text-sm",
                "w-full flex items-center justify-between rounded-md transition-all duration-150",

                // Disabled
                "disabled:opacity-50 disabled:cursor-not-allowed",

                // Base vs Active
                isSelected
                    ? "bg-blue-600 hover:bg-blue-500 ring-2 ring-blue-400"
                    : "bg-[#13202B] hover:bg-[#1a2d3c]"
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