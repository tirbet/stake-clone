"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type MarketNameProps = {
    id: number;
    isCenter?: boolean;
}

export default function MarketName({ id, isCenter = true }: Readonly<MarketNameProps>) {
    const t = useTranslations('market');
    return (
        <div className={cn(
            "flex gap-1 p-3",
            isCenter ? "items-center justify-center" : ""
        )}>
            <span className="text-xs text-gray-300">{t(`${id}.N`)}</span>
        </div>
    )
}
