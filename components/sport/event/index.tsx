"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetSport } from "@/features/sport/api/use-get-sport";
import { BreadcrumbSkeleton } from "@/components/skeleton/BreadcrumbSkeleton";
import { NoEventsMessage } from "@/components/sport/event/no-events-message";
import { EventListContent } from "@/components/sport/event/event-list-content";
import { useGetLeague } from "@/features/sport/api/use-get-league";
import { getDisplayName } from "@/lib/sport/sport-helper";
import SportBreadcrumb from "../sport-breadcrumb";
import slugify from "slugify";

type Props = {
    id: number;
    type: "live" | "upcoming";
};




export function EventList({ id, type }: Readonly<Props>) {

    const { data: items, isLoading, isPending } = useGetSport({
        type,
        id
    });
    const displayName = getDisplayName(type);
    if (isLoading || isPending) {
        return (
            <React.Fragment>
                <BreadcrumbSkeleton count={2} />
                <EventListSkeleton />
            </React.Fragment>
        );
    }

    if (!items || items.length === 0) {
        return <NoEventsMessage type={type} />;
    }

    return (
        <>
            <SportBreadcrumb
                back={`/sport`}
                items={[
                    {
                        name: displayName,
                        url: `/sport/${type}`,
                    },
                    {
                        name: items[0]?.sport || 'Sport',
                        url: '#'
                    },
                ]}
            />
            <EventListContent items={items} type={type} />
        </>
    )
}


export function LeagueList({ id, type, leagueId }: Readonly<Props & { leagueId: number }>) {

    const { data: items, isLoading, isPending } = useGetLeague({
        type,
        id,
        leagueId
    });
    const displayName = getDisplayName(type);
    if (isLoading || isPending) {
        return (
            <React.Fragment>
                <BreadcrumbSkeleton count={3} />
                <EventListSkeleton />
            </React.Fragment>
        );
    }

    if (!items || items.length === 0) {
        return <NoEventsMessage type={type} />;
    }

    return <>
        <SportBreadcrumb
            back={`/sport`}
            items={[
                {
                    name: displayName,
                    url: `/sport/${type}`,
                },
                {
                    name: items[0]?.sport || 'Sport',
                    url: `/sport/${type}/${slugify(items[0]?.sport || 'sport', { lower: true, strict: true })}`,
                },
                {
                    name: items[0]?.league || 'league',
                    url: '#'
                },
            ]}
        />
        <EventListContent items={items} type={type} />
    </>;
}



// EventListSkeleton.tsx
export const EventListSkeleton = () => {
    return (
        <div className="w-full">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-2">
                    <CountrySkeleton />
                    {/* Show 1-2 match cards for the first item */}
                    {i === 0 && (
                        <div className="bg-[rgb(26,44,56)] p-2 border-l border-r border-b border-gray-700 rounded-b-sm">
                            <MatchSkeleton />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// CountrySkeleton.tsx
export const CountrySkeleton = () => {
    return (
        <div className="bg-[rgb(7,29,42)] rounded-sm p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-5 w-5 rounded-md" />
            </div>
        </div>
    );
};

// MatchSkeleton.tsx
export const MatchSkeleton = () => {
    return (
        <div className="mb-2 bg-betslip rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-5 w-5 rounded-md" />
            </div>
            <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                    <MatchCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};

// MatchCardSkeleton.tsx
export const MatchCardSkeleton = () => {
    return (
        <div className="flex p-2 flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 bg-[rgb(40,60,75)] rounded">
            <div className="w-full md:w-[45%]">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[45%]">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-16 mx-auto" />
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-8 w-full rounded-md" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[10%] flex items-center justify-center">
                <Skeleton className="h-8 w-full rounded-md" />
            </div>
        </div>
    );
};