import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCurrencies = () => {
    const query = useQuery({
        queryKey: ["currencies"],
        queryFn: async () => {
            const response = await client.api.admin.currency.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch currencies");
            }
            const { currencies } = await response.json();

            return currencies;
        }
    })

    return query;
}