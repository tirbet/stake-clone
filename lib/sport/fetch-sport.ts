import { cache } from "react";
import { getLocale } from "next-intl/server";
import { apiClient } from "../api-client";
type Locale = "en" | "bn" | "hi";
type Props = {
    params: Promise<{
        status: string,
        sport: string;
        league: string;
        game: string
    }>;
};



export const getGame = cache(async (params: Props["params"]) => {
    const locale = await getLocale() as Locale;
    const { status, sport, league, game } = await params;
    return apiClient.GET("/sports/{status}/{sport}/{league}/{game}", {
        params: {
            path: { status: status as any, sport, league, game },
            query: { locale },
        },
        next: { revalidate: status === "live" ? 10 : 30 },
    });
});