import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.user.kyc[':label']['$post']>;
type RequestType = InferRequestType<typeof client.api.user.kyc[':label']['$post']>["form"];
type Variables = {
    label: string;
    form: RequestType;
};
export const useCreateUserKyc = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        Variables
    >({
        mutationFn: async ({ label, form }) => {
            const response = await client.api.user.kyc[":label"].$post({ form, param: { label } });
            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }
            return await response.json();
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["user-kyc"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return mutation;
};