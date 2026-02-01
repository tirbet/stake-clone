import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { apiClient } from "@/lib/api-client";
import slugify from "slugify";

type Props = {
    type: "live" | "upcoming";
    sport: string;
    league: string;
};

export const useGetLeague = ({ type, sport, league }: Props) => {
    const locale = useLocale();
    const query = useQuery({
        queryKey: ["sport-league", [locale, type, sport, league]],
        queryFn: async () => {
            const { data, error } = await apiClient.GET('/sports/{status}/{sport}/{league}', {
                params: {
                    query: {
                        locale: locale as any
                    },
                    path: {
                        status: type,
                        sport: slugify(sport, { lower: true, strict: true }),
                        league
                    }
                }
            })
            if (error) {
                console.log(error.error)
            }
            return data?.data
        },
        refetchInterval: type === "live" ? 15000 : 30000,
    })

    return query;
}
