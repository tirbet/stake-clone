import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType } from "hono";

type RequestType = InferRequestType<typeof client.api.admin.users.$get>["query"];

export const useGetUsers = (queryParams?: RequestType) => {
    const query = useQuery({
        queryKey: ["users", {queryParams}],
        queryFn: async () => {
            const response = await client.api.admin.users.$get({
                query: queryParams ?? {}
            });
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const { users } = await response.json();

            return users;
        }
    })

    return query;
}