"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, InfoIcon, Star } from "lucide-react";
import AuthenticatedCardSkeleton from "@/components/skeleton/AuthenticatedCardSkeleton";
// import { UserStats, useStatistic } from "@/hooks/use-statistics";


export default function AuthenticatedCard() {
    // const [item, setData] = useState<UserStats | null>(null);
    // const { onOpen: openStatistic, fetchStats } = useStatistic();
    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch(route('statistics'));
    //         const json = await res.json();
    //         setData(json);
    //     }

    //     fetchData();
    // }, []);
    // const stats = item;
    return (
        <>
            {!false ? (
                <AuthenticatedCardSkeleton />
            ) : (
                <div className="w-full h-full mr-auto max-h-fit max-w-full sm:max-w-[390px] flex flex-col justify-center items-start self-center bg-gray-900 border-0.5 sm:border-1 md:border-2 border-solid border-[rgb(47,69,83)]">
                    <div className="flex justify-center rounded-xl overflow-hidden relative w-full max-w-96 p-2 bg-gradient-to-b from-gray-700 to-gray-800 aspect-video">
                        <div className="content-center w-full h-full">
                            <div className="flex flex-col justify-between px-6 py-5 z-10 h-full bg-[#0f212e] text-white">
                                <div className="flex justify-between mb-6">
                                    <span>{"gat"}</span>
                                    <Star className="w-5 h-5 text-[#2F4553]" />
                                </div>
                                <div className="w-full" data-content>
                                    <div className="w-full">
                                        <div className="flex justify-between items-center gap-5">
                                            <div className="transition duration-250 flex justify-between">
                                                <button
                                                    onClick={async() => {
                                                        // await fetchStats();
                                                        // return openStatistic()
                                                    }}
                                                    className="inline-flex relative items-center gap-1 justify-center [border-radius:var(--ds-radius-md,0.25rem)] font-semibold whitespace-nowrap ring-offset-[var(--color-background)] transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-offset-2 focus-visible:outline active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white text-sm leading-none [&_svg]:text-gray-200 [&:hover>svg]:text-white">
                                                    Your VIP Progress
                                                    <ArrowRight className="w-4 h-4 text-gray-200" />
                                                </button>
                                            </div>
                                            <span className="flex gap-1">
                                                <span className="inline-flex items-center justify-start text-left text-sm font-semibold leading-[1.5] font-tabular-nums">
                                                    {/* {stats?.vipStatus.progressPercentage}% */}
                                                </span>
                                                <div className="inline-flex relative">
                                                    <InfoIcon className="w-4 h-4 text-gray-200" />
                                                </div>
                                            </span>
                                        </div>
                                        <div className="mt-1">
                                            {/* <Progress title={`${stats?.vipStatus.progressPercentage}%`} value={stats?.vipStatus.progressPercentage} className="bg-gray-500" /> */}
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <div className="flex items-center whitespace-nowrap gap-0.5 mt-0.5">
                                                <span className="inline-block">
                                                    <Star className="w-4 h-4 text-gray-500" />
                                                </span>
                                                {/* <span className="text-gray-500">{stats?.vipStatus.currentLevelName}</span> */}
                                            </div>
                                            <div className="flex items-center whitespace-nowrap gap-0.5 mt-0.5">
                                                <span className="inline-block">
                                                    <Star className="w-4 h-4 text-amber-200" />
                                                </span>
                                                {/* <span className="text-gray-500">{stats?.vipStatus.nextLevelName}</span> */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}