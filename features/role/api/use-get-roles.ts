import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetRoles = () => {
    const query = useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const responce = await client.api.admin.role.$get();
            if (!responce.ok) {
                throw new Error("Failed to fetch roles");
            }
            const { roles } = await responce.json();

            return roles;
        }
    })

    return query;
}