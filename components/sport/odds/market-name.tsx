"use client";
import { cn } from "@/lib/utils";

type MarketNameProps = {
    name: string
    isCenter?: boolean;
}

export default function MarketName({ name, isCenter = true }: Readonly<MarketNameProps>) {

    return (
        <div className={cn(
            "flex gap-1 p-3",
            isCenter ? "items-center justify-center" : ""
        )}>
            <span className="text-xs text-gray-300">{name}</span>

        </div>
    )
}
