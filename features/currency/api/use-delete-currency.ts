import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.admin.currency[":id"]["$delete"]>;

export const useDeleteCurrency = (id: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.admin.currency[":id"]["$delete"]({ param: { id } });
            return await response.json();
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["currency", { id }] });
            queryClient.invalidateQueries({ queryKey: ["currencies"] });
        },
        onError: () => {
            toast.error("Failed to delete currency");
        }
    });

    return mutation;
};