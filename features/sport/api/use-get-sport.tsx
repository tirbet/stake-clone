import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import slugify from "slugify";
import { apiClient, ApiPaths } from "@/lib/api-client";
type Props = {
    type: "live" | "upcoming";
    sport: string;
};
export type GetSportsResponse = ApiPaths['/sports/{status}/{sport}']['get']['responses']['200']['content']['application/json']['data'];

export const useGetSport = ({ type, sport }: Props) => {
    const locale = useLocale();
    const query = useQuery({
        queryKey: ["sport", [locale, type, sport]],
        queryFn: async () => {
            const { data, error } = await apiClient.GET('/sports/{status}/{sport}', {
                params: {
                    query: {
                        locale: locale as any
                    },
                    path: {
                        status: type,
                        sport:  slugify(sport, { lower: true, strict: true })
                    }
                }
            })
            if (error) {
                console.log(error.error)
            }
            return data?.data
        },
        refetchInterval: type === "live" ? 15000 : 30000,
        networkMode: 'online',
    })

    return query;
}
