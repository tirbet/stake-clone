"use client";
import { Odds } from "@/components/sport/odds";
import MarketSkeleton from "@/components/skeleton/MarketSkeleton";
import { useGetGame } from "@/features/sport/api/use-get-game";
import { useGameGroupStore } from "@/store/game-group-store";
type MarketProps = {
    eventId: number;
    status: 'live' | 'upcoming';
}

export default function Market({ eventId, status }: MarketProps) {
    const { data: group } = useGameGroupStore();
    const { data, isLoading, isPending } = useGetGame({
        id: group?.id ?? eventId,
        type: status
    })
    if (isLoading) {
        return <MarketSkeleton />;
    }
    const markets = data?.markets;
    if (!markets || markets.length === 0) {
        return <div className="text-center text-sm text-gray-400 py-4">No markets available</div>;
    }

    return (
        <>
            {markets.map((market, index) => (
                <Odds key={index} market={market} index={index} eventId={eventId} group={group}/>
            ))}
        </>
    );
}