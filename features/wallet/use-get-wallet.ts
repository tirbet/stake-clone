import { getActiveWallet } from "@/server/actions/wallet.action";
import { useQuery } from "@tanstack/react-query";

export const useGetWallet = () => {
    const query = useQuery({
        queryKey: ["wallet"],
        queryFn: async () => {
            return await getActiveWallet();
        },
        refetchOnWindowFocus: true,
    });

    return query;
};


