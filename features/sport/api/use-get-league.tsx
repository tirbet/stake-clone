import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useLocale } from "next-intl";

type Props = {
    type: "live" | "upcoming";
    id: number;
    leagueId: number;
};

export const useGetLeague = ({ type, id, leagueId }: Props) => {
    const lng = useLocale();
    const query = useQuery({
        queryKey: ["sport-league", [lng, type, id, leagueId]],
        queryFn: async () => {
            const url = type === "live" ? client.api.sports.live[':id']['leagues'][':leagueId'].$get({
                param: { id: id.toString(), leagueId: leagueId.toString() },
                query: { lng }
            }) : client.api.sports.upcoming[':id']['leagues'][':leagueId'].$get({
                param: { id: id.toString(), leagueId: leagueId.toString() },
                query: { lng }
            });
            const response = await url;
            if (!response.ok) {
                throw new Error("Failed to fetch league data");
            }
            const { data } = await response.json();

            return data;
        },
        refetchInterval: type === "live" ? 15000 : 30000,
    })

    return query;
}
