import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { apiClient, ApiPaths } from "@/lib/api-client";
import slugify from "slugify";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { groupEventsByCountryAndLeague } from "@/lib/sport/sport-helper";
import { useSportStatus } from "@/store/sport-status";

type Status = "live" | "upcoming";
type Locale = "en" | "bn" | "hi";

export type NavSport = ApiPaths['/sports/{status}']['get']['responses']['200']['content']['application/json']['data'][number]
export const useGetSports = () => {
    const locale = useLocale() as Locale;
    const status = useSportStatus((s) => s.status);
    return useSuspenseQuery({
        queryKey: ["sports", [locale, status]],
        queryFn: async () => {
            const { data, error } = await apiClient.GET('/sports/{status}', {
                params: {
                    query: {
                        locale
                    },
                    path: {
                        status
                    }
                }
            })
            if (error) {
                console.log(error.error)
            }
            return data?.data

        },
        select: (data) => {
            return data || []
        },
        refetchInterval: status === "live" ? 15000 : 30000,
    })
}

export const useGetGame = () => {
    const locale = useLocale() as Locale;
    const params = useParams<{
        status: Status;
        sport: string;
        league: string;
        game: string;
    }>();
    const searchParams = useSearchParams();

    const marketType = searchParams.get("marketType") as any ?? undefined;

    const sportSlug = useMemo(
        () => slugify(params.sport, { lower: true, strict: true }),
        [params.sport]
    );

    return useSuspenseQuery({
        queryKey: [
            "sport",
            locale,
            params.status,
            sportSlug,
            params.league,
            params.game,
            marketType,
        ],

        queryFn: async () => {
            const { data, error } = await apiClient.GET(
                "/sports/{status}/{sport}/{league}/{game}",
                {
                    params: {
                        query: {
                            locale,
                            marketType,
                        },
                        path: {
                            status: params.status,
                            sport: sportSlug,
                            league: params.league,
                            game: params.game,
                        },
                    },
                }
            );

            if (error) {
                // Let React Query handle error boundaries
                throw new Error(error.error ?? "Failed to fetch game");
            }

            return data?.data;
        },
        refetchInterval: params.status === "live" ? 15_000 : 30_000,
        staleTime: params.status === "live" ? 0 : 10_000,
    });
};

export const useGetLeague = () => {
    const locale = useLocale() as Locale;
    const params = useParams<{
        status: Status;
        sport: string;
        league: string;
        game: string;
    }>();
    const sportSlug = useMemo(
        () => slugify(params.sport, { lower: true, strict: true }),
        [params.sport]
    );
    return useSuspenseQuery({
        queryKey: [
            "sport",
            locale,
            params.status,
            sportSlug,
            params.league,
            params.game,
        ],
        queryFn: async () => {
            const { data, error } = await apiClient.GET('/sports/{status}/{sport}/{league}', {
                params: {
                    query: {
                        locale
                    },
                    path: {
                        status: params.status,
                        sport: sportSlug,
                        league: params.league,
                    }
                }
            })
            if (error) {
                console.log(error.error)
            }
            return data
        },
        select: (data) => {
            const items = data?.data || []
            const res = groupEventsByCountryAndLeague(items)
            return res
        },
        refetchInterval: params.status === "live" ? 15_000 : 30_000,
        staleTime: params.status === "live" ? 0 : 10_000,
    })
}

export const useGetSport = () => {
    const locale = useLocale() as Locale;
    const params = useParams<{
        status: Status;
        sport: string;
    }>();
    const sportSlug = useMemo(
        () => slugify(params.sport, { lower: true, strict: true }),
        [params.sport]
    );
    return useSuspenseQuery({
        queryKey: [
            "sport",
            locale,
            params.status,
            sportSlug,
        ],
        queryFn: async () => {
            const { data, error } = await apiClient.GET('/sports/{status}/{sport}', {
                params: {
                    query: {
                        locale
                    },
                    path: {
                        status: params.status,
                        sport: sportSlug,
                    }
                }
            })
            if (error) {
                console.log(error.error)
            }
            return data
        },
        select: (data) => {
            const items = data?.data || []
            const res = groupEventsByCountryAndLeague(items)
            return res
        },
        refetchInterval: params.status === "live" ? 15_000 : 30_000,
        staleTime: params.status === "live" ? 0 : 10_000,
    })
}
