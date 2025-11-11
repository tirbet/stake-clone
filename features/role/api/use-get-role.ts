import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetRole = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["role", { id }],
        queryFn: async () => {
            if(!id) throw new Error("Failed to fetch role"); 
            const responce = await client.api.admin.role[":id"].$get({
                param: { id },
            });
            if (!responce.ok) {
                throw new Error("Failed to fetch role");
            }
            const { role } = await responce.json();

            return role;
        }
    })

    return query;
}