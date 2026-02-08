import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";


type SliderArrowButtonProps = {
    direction: 'prev' | 'next';
    canScroll: boolean;
    onClick: () => void;
};

export const SliderArrowButton = ({ direction, canScroll, onClick }: SliderArrowButtonProps) => {
    const isPrev = direction === 'prev';
    const Icon = isPrev ? ArrowLeftIcon : ArrowRightIcon;

    return (
        <button
            className={cn(
                "flex items-center justify-center w-10 h-10 transition",
                isPrev ? "rounded-l-full" : "rounded-r-full",
                canScroll ? "cursor-pointer hover:bg-white/5" : "cursor-auto"
            )}
            aria-label={isPrev ? "Previous" : "Next"}
            aria-disabled={!canScroll}
            onClick={onClick}
        >
            <Icon className={cn("h-4 w-4", {
                "text-white/70": canScroll,
                "text-white/30": !canScroll,
            })} />
        </button>
    );
};