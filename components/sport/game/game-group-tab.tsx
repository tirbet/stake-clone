import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
type Groups = GetSportsResponse[number]['groups']
type MarketType = GetSportsResponse[number]['marketType']
export function GameGroupTab({ groups, marketTypes }: { groups: Groups, marketTypes: MarketType }) {
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();
    const [id, setId] = useState<number | undefined>(undefined)
    const handleMarketChange = (marketKey: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("marketType", marketKey);

        router.push(`?${params.toString()}`, { scroll: false });
    };
    const game = params.game as string;
    const clean = game.split("?")[0];
    const gameId = clean.split("-")[0];
    
    const marketItems = [...(marketTypes ?? [])]
        .filter(m => m.count > 0)
        .sort((a, b) => b.count - a.count);
    const defaultValue = groups?.find(item => item.id == Number(gameId))?.slug

    return (
        <ScrollArea className="flex w-full mt-0 mb-2 p-1.25 items-center rounded-md bg-sidebar">
            <div className="flex gap-0.5 px-2 py-1 w-full max-w-5xl">
                {/* Groups Select */}

                <Select defaultValue={defaultValue} onValueChange={(slug) => router.push(slug, {scroll: false})}>
                    <SelectTrigger className="w-48"  aria-label="Select group">
                        <SelectValue placeholder="Select a group" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {groups?.map(item => (
                                <SelectItem key={item.slug} value={item.slug}>
                                    {item.name}
                                </SelectItem>
                            ))}

                        </SelectGroup>
                    </SelectContent>
                </Select>
                {marketItems.map((market) => (
                    <button
                        key={market.id}
                        onClick={() => {
                            setId(market.id)
                            handleMarketChange(market.key)
                        }}
                        className={cn(
                            "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                            "border border-transparent",
                            market.id === id
                                ? "bg-[rgb(47,69,83)] text-white shadow-sm"
                                : "text-white hover:text-white hover:border-[rbg(61,85,100)]"
                        )}
                    >
                        {market.name} ({market.count})
                    </button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}