'use client';

import React from "react";
import SportBreadcrumb from "../sport-breadcrumb";
import { useGetGame } from "@/features/sport/api/use-get-game";
import slugify from "slugify";
import { getDisplayName, getTeamsDisplayName } from "@/lib/sport/sport-helper";

import { GameGroupTab } from "@/components/sport/game/game-group-tab";
import { GameStatistics } from "@/components/sport/game/game-statistics";
import Market from "../odds/market";

type Props = {
    eventId: number;
    status: 'live' | 'upcoming';
};
export function Game({ eventId, status }: Readonly<Props>) {
    const { data, isLoading, isPending } = useGetGame({
        id: eventId,
        type: status
    })
    const sportName = getDisplayName(status);
    const teams = getTeamsDisplayName(data?.team)
    return (
        <React.Fragment>
            <SportBreadcrumb back="" items={[
                {
                    name: `${sportName}`,
                    url: `/sport/${status}`
                },
                {
                    name: `${data?.sport}`,
                    url: `/sport/${status}/${slugify(data?.sportEn || '', { lower: true, strict: true })}`
                },
                {
                    name: `${data?.league}`,
                    url: `/sport/${status}/${slugify(data?.sportEn || '', { lower: true, strict: true })}/${data?.leagueId}-${slugify(data?.leagueEn || '', { lower: true, strict: true })}`
                },
                {
                    name: `${teams}`,
                    url: `/sport/${status}/${slugify(data?.sportEn || '', { lower: true, strict: true })}/${data?.leagueId}-${slugify(data?.leagueEn || '', { lower: true, strict: true })}/${data?.Id
                        }-${slugify(data?.team.home.nameEn || '', { lower: true, strict: true })}-vs-${slugify(
                            data?.team.away.nameEn || '',
                            { lower: true, strict: true }
                        )}`
                }

            ]} />
            <GameStatistics />
            <GameGroupTab groups={data?.groups} />
            <Market eventId={eventId} status={status}/>
        </React.Fragment>
    )
}