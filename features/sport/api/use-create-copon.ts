import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useCouponStore } from "@/store/coupon-store";
export type CouponResponseType = InferResponseType<typeof client.api.sports.$post>;
export type CouponRequestType = InferRequestType<typeof client.api.sports.$post>["json"];

export const useCreateCoupon = () => {
    const coupons = useCouponStore(s => s.coupons);
    const syncServerData = useCouponStore(s => s.syncServerData);

    return useQuery({
        queryKey: ["coupon-sync", coupons],

        enabled: coupons.length > 0,

        queryFn: async () => {
            const res = await client.api.sports.$post({
                json: {
                    coupon: coupons.map(item => ({
                        GameId: item.GameId,
                        Type: item.Type,
                        Param: item.Param,
                        Coef: item.Coef,
                        Kind: item.Kind,
                        Expired: item.Expired,
                        Seconds: item.Seconds,
                        InstrumentId: item.InstrumentId,
                        PlayerId: item.PlayerId,
                        PlayersDuel: item.PlayersDuel,
                        Price: item.Price,
                        PV: item.PV,
                    }))
                }
            });

            if (!res.ok) throw new Error("Sync failed");

            const json = await res.json();

            if (json?.data?.items) {
                syncServerData(json.data.items);
            }

            return json;
        },

        refetchInterval: coupons.length ? 15000 : false,

        refetchIntervalInBackground: false,

        staleTime: 10000,

        networkMode: "online",


    });
};
