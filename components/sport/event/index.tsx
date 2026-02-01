"use client";
import { Skeleton } from "@/components/ui/skeleton";

import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import SportBreadcrumb from "../sport-breadcrumb";
import { useTranslations } from "next-intl";
import { useGetLeague, useGetSport } from "@/features/sport/api/use-get-game";
import { CountrySection } from "./country-section";



export function EventList({ iniData }: Readonly<{ iniData: GetSportsResponse }>) {
    const t = useTranslations('status');

    const { data } = useGetSport();

    return (
        <>
            <SportBreadcrumb
                back={`/sports`}
                items={[
                    {
                        name: t(`${data[0].leagues[0].items[0].status}`),
                        url: `/sports/${data[0].leagues[0].items[0].status}`,
                    },
                    {
                        name: data[0].leagues[0].items[0].sport.name,
                        url: data[0].leagues[0].items[0].sport.slug,
                    }
                ]}
            />
            <CountrySection data={data} />
        </>
    )
}


export function LeagueList({ iniData }: Readonly<{ iniData: GetSportsResponse }>) {
    const t = useTranslations('status');
    const { data } = useGetLeague();
    return (<>
        <SportBreadcrumb
            back={`/sport`}
            items={[
                {
                    name: t(`${iniData[0].status}`),
                    url: `/sports/${iniData[0].status}`,
                },
                {
                    name: iniData[0].sport.name,
                    url: iniData[0].sport.slug,
                },
                {
                    name: iniData[0].league.name,
                    url: iniData[0].league.slug,
                }
            ]}
        />

        <CountrySection data={data} />
    </>);
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