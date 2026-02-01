'use client';

import React, { Suspense } from "react";
import SportBreadcrumb from "../sport-breadcrumb";
import MarketSkeleton from "@/components/skeleton/MarketSkeleton";

import { useTeamsDisplayName } from "@/lib/sport/sport-helper";

import { GameGroupTab } from "@/components/sport/game/game-group-tab";
import { GameStatistics } from "@/components/sport/game/game-statistics";
import Market from "../odds/market";
import { useTranslations } from "next-intl";
import { BreadcrumbSkeleton } from "@/components/skeleton/BreadcrumbSkeleton";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";

type Props = {
    data?: GetSportsResponse[number]
};
export function Game({ data }: Readonly<Props>) {
    const t = useTranslations('status');

    const teams = useTeamsDisplayName(data?.team)

    return (
        <React.Fragment>
            {!data ? (<BreadcrumbSkeleton count={4} />) : (
                <>
                    <SportBreadcrumb back="" items={[
                        {
                            name: t(`${data.status}`),
                            url: `/sports/${data.status}`
                        },
                        {
                            name: `${data?.sport.name}`,
                            url: data.sport.slug,
                        },
                        {
                            name: `${data?.league.name}`,
                            url: data?.league.slug,
                        },
                        {
                            name: `${teams}`,
                            url: data?.slug,
                        }

                    ]} />

                    <GameStatistics gameId={data.sport.id} />
                    <GameGroupTab groups={data.groups} marketTypes={data.marketType} />
                </>
            )}
            <Suspense fallback={<MarketSkeleton />}>
                <Market />
            </Suspense>
        </React.Fragment>
    )
}