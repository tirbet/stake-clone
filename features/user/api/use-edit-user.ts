import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.admin.users[":id"]["$put"]>;
type RequestType = InferRequestType<typeof client.api.admin.users[":id"]["$put"]>["json"];

export const useEditUser = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            if(!id) throw new Error('Failed to edit user')
            const response = await client.api.admin.users[":id"]["$put"]({json, param: { id }});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("User updated");
            queryClient.invalidateQueries({ queryKey: ["user", { id }] });
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            toast.error("Failed to edit user");
        }
    });

    return mutation;
};