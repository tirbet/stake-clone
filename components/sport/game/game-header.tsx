'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetGame } from "@/features/sport/api/use-get-game";
import { cn } from "@/lib/utils";
import { CloudSunIcon, InfoIcon, LineChartIcon } from "lucide-react";
import Image from "next/image";
import ScoreInfo from "./score-Info";
import { WeatherCard } from "./weather-card";
import Statistic from "./statistics";
type Props = {
    gameId: number;
};

export function GameHeader({ gameId }: Readonly<Props>) {
    const { data } = useGetGame();

    return (
        <div className="relative flex w-full h-48 md:h-64 max-h-75">
            {/* Background */}
            <Image
                src={`/assets/${gameId}.jpg`}
                alt="bg"
                priority
                fill
                className="absolute inset-0 w-full h-full  object-cover" />
            {/* Gradient overlay */}
            <div
                className={cn(
                    "absolute inset-0 bg-linear-to-t",
                    // Light mode
                    "from-black/60 via-black/30 to-black/5",
                    // Dark mode
                    "dark:from-black/80 dark:via-black/50 dark:to-black/20"
                )}
            />
            {/* Vignette */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none",
                    // Light mode
                    "shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]",
                    // Dark mode
                    "dark:shadow-[inset_0_0_90px_rgba(0,0,0,0.7)]"
                )}
            />

            <Tabs defaultValue="info" className="relative w-full">
                {/* Info Tab */}
                <TabsContent value="info" className="flex items-center justify-center w-full h-full">
                    <ScoreInfo data={data} />
                </TabsContent>

                {/* Head to Head Tab */}
                <TabsContent value="cloud" className="flex items-center justify-center w-full h-full">
                    <WeatherCard data={data} />
                </TabsContent>
                <TabsContent value="scoreContext" className="flex items-center justify-center w-full h-full" >
                    <Statistic data={data} />
                </TabsContent>
                {/* Tab Triggers overlayed on image */}
                <TabsList className="relative bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 bg-sidebar/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                    {data && (
                        <TabsTrigger
                            value="info"
                            className="px-3 py-1 text-sm text-white data-[state=active]:bg-orange-500 rounded-full"
                        >
                            <InfoIcon size={28} />
                        </TabsTrigger>
                    )}
                    {data.weather && (
                        <TabsTrigger
                            value="cloud"
                            className="px-3 py-1 text-sm text-white data-[state=active]:bg-orange-500 rounded-full"
                        >
                            <CloudSunIcon size={28} />
                        </TabsTrigger>
                    )}
                    {data.scoreContext && (
                        <TabsTrigger
                            value="scoreContext"
                            className="px-3 py-1 text-sm text-white data-[state=active]:bg-orange-500 rounded-full"
                        >
                            <LineChartIcon size={28} />
                        </TabsTrigger>
                    )}
                </TabsList>
            </Tabs>
        </div>
    )
}