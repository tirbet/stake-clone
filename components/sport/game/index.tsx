'use client';
import React, { Suspense } from "react";
import MarketSkeleton from "@/components/skeleton/MarketSkeleton";
import { GameGroupTab } from "@/components/sport/game/game-group-tab";
import { GameHeader } from "@/components/sport/game/game-header";
import Market from "../odds/market";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";

type Props = {
    data: GetSportsResponse[number]
};
export function Game({ data }: Readonly<Props>) {
    return (
        <React.Fragment>
            <GameHeader gameId={data.sport.id} />
            <GameGroupTab groups={data.groups} marketTypes={data.marketType} />
            <Suspense fallback={<MarketSkeleton />}>
                <Market />
            </Suspense>
        </React.Fragment>
    )
}