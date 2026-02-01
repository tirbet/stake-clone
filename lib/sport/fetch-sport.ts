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
export async function fetchSportsData<T = unknown>({ url }: { url: string }): Promise<T> {
    const parsedUrl = new URL(url);
    // Access query parameters
    const params = Array.from(parsedUrl.searchParams.entries()).map(
        ([key, value]) => `${key}-${value}`
    );
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url,
        {
            signal: controller.signal,
            cache: 'no-store',
            keepalive: true

        });

    clearTimeout(timeout);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}


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