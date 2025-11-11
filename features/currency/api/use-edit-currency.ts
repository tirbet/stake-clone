import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.admin.currency[":id"]["$put"]>;
type RequestType = InferRequestType<typeof client.api.admin.currency[":id"]["$put"]>["json"];

export const useEditCurrency = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            if(!id) throw new Error('Failed to edit currency')
            const response = await client.api.admin.currency[":id"]["$put"]({json, param: { id }});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Currency updated");
            queryClient.invalidateQueries({ queryKey: ["currency", { id }] });
            queryClient.invalidateQueries({ queryKey: ["currencies"] });
        },
        onError: () => {
            toast.error("Failed to edit currency");
        }
    });

    return mutation;
};