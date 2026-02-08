"use client";
import { Odds } from "@/components/sport/odds";

import { useGetGame } from "@/features/sport/api/use-get-game";

export default function Market() {

    const game = useGetGame()

    const markets = game.data.markets;
    if (!markets || markets.length === 0) {
        return <div className="text-center text-sm text-gray-400 py-4">No markets available</div>;
    }

    return (
        <>
            {markets.map((market, index) => (
                <Odds 
                    key={index} 
                    market={market} 
                    index={index} 
                    gameId={game.data.id} 
                    status={game.data.status}
                    team={game.data.team}
                    />
            ))}
        </>
    );
}