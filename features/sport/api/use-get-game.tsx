import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useLocale } from "next-intl";

type Props = {
    type: "live" | "upcoming";
    id: number;

};

export const useGetGame = ({ type, id }: Props) => {
    const lng = useLocale();
    const query = useQuery({
        queryKey: ["sport-league-game", [lng, type, id]],
        queryFn: async () => {
            // const url = type === "live" ? client.api.sports.live[':id']['leagues'][':leagueId'].$get({
            //     param: { id: id.toString(), leagueId: leagueId.toString() },
            //     query: { lng }
            // }) : client.api.sports.upcoming[':id']['leagues'][':leagueId'].$get({
            //     param: { id: id.toString(), leagueId: leagueId.toString() },
            //     query: { lng }
            // });
            const response = await client.api.sports.upcoming['game'][':gameId'].$get({
                param: { gameId: id.toString() },
                query: { lng }
            });
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
