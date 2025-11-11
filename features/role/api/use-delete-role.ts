import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.admin.role[":id"]["$delete"]>;

export const useDeleteRole = (id: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.admin.role[":id"]["$delete"]({ param: { id } });
            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }
            return await response.json();
        },
        onSuccess: (data) => {
            toast.success(data.message || "Role deleted");
            queryClient.invalidateQueries({ queryKey: ["role", { id }] });
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
        onError: (error) => {
            toast.error(error.message ||"Failed to delete role");
        }
    });

    return mutation;
};