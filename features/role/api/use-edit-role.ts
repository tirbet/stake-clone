import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.admin.role[":id"]["$put"]>;
type RequestType = InferRequestType<typeof client.api.admin.role[":id"]["$put"]>["json"];

export const useEditRole = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            if (!id) throw new Error("Failed to fetch permission");
            const response = await client.api.admin.role[":id"]["$put"]({ json, param: { id } });
            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }
            return await response.json();
        },
        onSuccess: (data) => {
            toast.success(data.message || "Role updated");
            queryClient.invalidateQueries({ queryKey: ["role", { id }] });
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to edit role");
        }
    });

    return mutation;
};