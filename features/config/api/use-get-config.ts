import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetConfig = () => {
   
    const query = useQuery({
        queryKey: ["config"],
        queryFn: async () => {
            const response = await client.api.config.$get();
            if (!response.ok) {
                throw new Error('Failed to fetch  config');
            }
            const result = await response.json();

            return result.data;
        },
        staleTime: 5 * 60 * 1000,
    })
    return query;
}