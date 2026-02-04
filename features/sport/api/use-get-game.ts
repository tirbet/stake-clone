import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { ApiPaths } from "@/lib/api-client";
import slugify from "slugify";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { groupEventsByCountryAndLeague } from "@/lib/sport/sport-helper";
import { useSportStatus } from "@/store/sport-status";
import { client } from "@/lib/hono";
type Status = "live" | "upcoming";
type Locale = "en" | "bn" | "hi";

export type NavSport = ApiPaths['/sports/{status}']['get']['responses']['200']['content']['application/json']['data'][number]
export const useGetSports = () => {
    const locale = useLocale() as Locale;
    const status = useSportStatus((s) => s.status);
    return useSuspenseQuery({
        queryKey: ["sports", [locale, status]],
        queryFn: async () => {
            const res = await client.api.sports[":status"].$get({
                param: {
                    status
                },
                query: {
                    locale
                }
            })
            if (!res.ok) {
                throw new Error('some worong')
            }
            const { data } = await res.json();
            return data.data
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
            const res = await client.api.sports[":status"][":sport"][":league"][":game"].$get({
                param: { ...params },
                query: {
                    locale
                }
            })
            if (!res.ok) {
                throw new Error('some worong')
            }
            const { data } = await res.json();
            return data.data
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
            const res = await client.api.sports[":status"][":sport"][":league"].$get({
                param: { ...params },
                query: {
                    locale
                }
            })
            if (!res.ok) {
                throw new Error('some worong')
            }
            const { data } = await res.json();
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
            const res = await client.api.sports[":status"][":sport"].$get({
                param: { ...params },
                query: {
                    locale
                }
            })
            if (!res.ok) {
                throw new Error('some worong')
            }
            const { data } = await res.json();
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

export const useGetTopGame = ({ status }: { status: Status }) => {
    const locale = useLocale() as Locale;
    return useSuspenseQuery({
        queryKey: ["sport", "get-top-game", status],
        queryFn: async () => {
            const res = await client.api.sports["top"][":status"].$get({
                param: { status },
                query: {
                    locale
                }
            })
            if (!res.ok) {
                throw new Error('some worong')
            }
            const { data } = await res.json();
            return data
        },
        select: (data) => {
            const items = data?.data || []
            return items.filter((item) =>
                item.markets?.some(
                    (m) =>
                        (m.id === 1 || m.id === 8) &&
                        m.outcomes?.some((o) => o.length > 0)
                )
            );
        },
        refetchInterval: status === "live" ? 15_000 : 30_000,
        staleTime: status === "live" ? 0 : 10_000,
    })
}

export const useGetRecommendationGame = ({ status }: { status: Status }) => {
    const locale = useLocale() as Locale;
    return useSuspenseQuery({
        queryKey: ["sport", "get-recommendatio-game", status],
        queryFn: async () => {
            const res = await client.api.sports["recommendations"][":status"].$get({
                param: { status },
                query: {
                    locale
                }
            })
            if (!res.ok) {
                throw new Error('some worong')
            }
            const { data } = await res.json();
            return data
        },
        select: (data) => {
            const items = data?.data || []
            return items.filter((item) =>
                item.markets?.some(
                    (m) =>
                        (m.id === 1 || m.id === 8) &&
                        m.outcomes?.some((o) => o.length > 0)
                )
            );
        },
        refetchInterval: status === "live" ? 15_000 : 30_000,
        staleTime: status === "live" ? 0 : 10_000,
    })
}