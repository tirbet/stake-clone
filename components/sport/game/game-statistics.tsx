'use client';

import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

export function GameStatistics({gameId}: {gameId: number}) {
    return (
        <div className="relative flex w-full h-48 md:h-64 max-h-75">
            {/* Background */}
            <Image
                src={`/assets/${gameId}.jpg`}
                alt="bg"
                width={100}
                height={100}        
                loading="eager"        
                className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <Tabs defaultValue="info" className="relative w-full">
                {/* Info Tab */}
                <TabsContent value="info" className="flex items-center justify-center w-full h-full">
                    {/* <ScoreInfo /> */}
                </TabsContent>

                {/* Head to Head Tab */}
                <TabsContent value="cloud" className="flex items-center justify-center w-full h-full">
                    {/* <WeatherCard /> */}
                </TabsContent>
            </Tabs>
        </div>
    )
}