import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useLocale } from "next-intl";

type Props = {
    type: "live" | "upcoming";
    id: number;
};

export const useGetSport = ({ type, id }: Props) => {
    const lng = useLocale();
    const query = useQuery({
        queryKey: ["sport", [lng, type, id]],
        queryFn: async () => {
            const url = type === "live" ? client.api.sports.live[':id'].$get({                
                param: { id: id.toString() },
                query: { lng }
            }) : client.api.sports.upcoming[':id'].$get({
                param: { id: id.toString() },
                query: { lng }
            });
            const response = await url;
            if (!response.ok) {
                throw new Error("Failed to fetch upcoming sport");
            }
            const { data } = await response.json();

            return data;
        },
        refetchInterval: type === "live" ? 15000 : 30000,
        networkMode: 'online',
    })

    return query;
}
