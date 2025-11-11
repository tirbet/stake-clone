import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetUser = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["user", { id }],
        queryFn: async () => {

            if (!id) throw new Error("Failed to fetch user id");

            const responce = await client.api.admin.users[":id"].$get({
                param: { id },
            });
            if (!responce.ok) {
                throw new Error("Failed to fetch user");
            }
            const { user } = await responce.json();

            return user;
        }
    })

    return query;
}