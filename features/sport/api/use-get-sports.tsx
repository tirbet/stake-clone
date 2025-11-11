import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useLocale } from "next-intl";

type Props = {
    type: "live" | "upcoming";
};

export const useGetSports = ({ type }: Props) => {
    const locale = useLocale();
    const query = useQuery({
        queryKey: ["sports", [locale, type]],
        queryFn: async () => {
            const url = type === "live" ? client.api.sports.live.$get({
                query: { lng: locale }
            }) : client.api.sports.upcoming.$get({
                query: { lng: locale }
            });
            const response = await url;
            if (!response.ok) {
                throw new Error("Failed to fetch upcoming sports");
            }
            const { data } = await response.json();

            return data;
        },
        refetchInterval: type === "live" ? 15000 : 30000,
    })

    return query;
}