'use client';

import { Tabs, TabsContent } from "@/components/ui/tabs";

export function GameStatistics() {
    return (
        <div className="relative flex w-full h-48 md:h-64 max-h-[300px]">
            {/* Background */}
            <img
                src={`/assets/${1}.jpg`}
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