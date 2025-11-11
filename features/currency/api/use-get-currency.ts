import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCurrency = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["currency", { id }],
        queryFn: async () => {

            if (!id) throw new Error("Failed to fetch currency id");

            const responce = await client.api.admin.currency[":id"].$get({
                param: { id },
            });
            if (!responce.ok) {
                throw new Error("Failed to fetch user");
            }
            const { currency } = await responce.json();

            return currency;
        }
    })

    return query;
}