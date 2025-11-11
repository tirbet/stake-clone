import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.admin.role.$post>;
type RequestType = InferRequestType<typeof client.api.admin.role.$post>["json"];

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.admin.role.$post({ json });
            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }
            return await response.json();
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return mutation;
};