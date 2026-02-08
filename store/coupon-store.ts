import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

import { type CouponRequestType } from "@/features/sport/api/use-create-copon";
import type { GetSportsResponse } from "@/features/sport/api/use-get-sport";
type BetMode = "single" | "multi";
export type CouponItem = CouponRequestType['coupon'][number] & {
    team?: GetSportsResponse[number]['team'];
    betAmount?: number;
    marketId?: number;
    marketName?: string;
    name?: string;
    sportId?: number;
    suspended?: boolean;
    finish?: boolean;
    serverCoef?: number;
    gameStatus?: string;
};

type SyncServerType = {
    gameId: number;
    gameConstId: number;
    name: string;
    marketId: number;
    outcomeId: number;
    param: number;
    coefficient: number;
    suspended: boolean;
    finish: boolean;
    gameStatus: "live" | "upcoming";
    isRelation: number;
    timeSec: number;
    timeDirection: number;
}

interface CouponStoreState {
    coupons: CouponItem[];
    selectedSet: Set<string>;
    isOpen: boolean;
    addItem: (item: CouponItem) => void;
    removeItem: (GameId: number, marketId: number, Type: number, Param?: number) => void;
    onClearAll: () => void;
    handlePlaceBet: () => void;
    syncServerData: (items: SyncServerType[]) => void;
    isSelected: (
        GameId: number,
        marketId?: number,
        Type?: number,
        Param?: number
    ) => boolean;
    setIsOpen: () => void
    setBetAmount: (
        GameId: number,
        marketId: number,
        Type: number,
        Param: number | undefined,
        amount: string
    ) => void;
    getTotalStake: () => number;
    getTotalPotentialWin: () => number;
    hasInstrument: () => boolean;
    betMode: BetMode;
    setBetMode: (mode: BetMode) => void,

}
const normalizeParam = (p?: number | null) =>
    p != null ? p : 0;

const getSelectionKey = (
    gameId: number,
    marketId?: number,
    outcomeId?: number,
    param?: number | null
) => `${gameId}-${marketId ?? 0}-${outcomeId ?? 0}-${normalizeParam(param)}`;

export const useCouponStore = create<CouponStoreState>()(
    devtools(persist(
        (set, get) => ({
            coupons: [],
            selectedSet: new Set(),
            isOpen: false,
            betMode: 'single',
            isSelected: (GameId, marketId, Type, Param) => {
                return get().selectedSet.has(
                    getSelectionKey(GameId, marketId, Type, Param)
                );
            },
            setIsOpen: () => {
                set((state) => {
                    return { isOpen: !state.isOpen }
                })
            },
            addItem: (item) => {
                set((state) => {

                    const key = getSelectionKey(
                        item.GameId,
                        item.marketId,
                        item.Type,
                        item.Param
                    );
                    console.log(key)

                    const exists = state.selectedSet.has(key);

                    // Toggle remove
                    if (exists) {
                        const newCoupons = state.coupons.filter(c =>
                            getSelectionKey(
                                c.GameId,
                                c.marketId,
                                c.Type,
                                c.Param
                            ) !== key
                        );

                        const newSet = new Set(state.selectedSet);
                        newSet.delete(key);

                        return {
                            coupons: newCoupons,
                            selectedSet: newSet
                        };
                    }
                    // Remove same market selection (1 per market rule)
                    const filteredCoupons = state.coupons.filter(c =>
                        !(
                            c.GameId === item.GameId &&
                            c.marketId === item.marketId
                        )
                    );

                    const newSet = new Set(
                        filteredCoupons.map(c =>
                            getSelectionKey(
                                c.GameId,
                                c.marketId,
                                c.Type,
                                c.Param
                            )
                        )
                    );

                    newSet.add(key);

                    return {
                        coupons: [...filteredCoupons, item],
                        selectedSet: newSet
                    };
                })

            },
            removeItem: (GameId, marketId, Type, Param) => {
                set((state) => {

                    const key = getSelectionKey(
                        GameId,
                        marketId,
                        Type,
                        Param
                    );
                    const newCoupons = state.coupons.filter(c =>
                        getSelectionKey(
                            c.GameId,
                            c.marketId,
                            c.Type,
                            c.Param
                        ) !== key
                    );

                    const newSet = new Set(state.selectedSet);
                    newSet.delete(key);

                    return {
                        coupons: newCoupons,
                        selectedSet: newSet
                    };
                });
            },
            onClearAll: () => {
                set((state) => {
                    return {
                        coupons: [],
                        selectedSet: new Set(),
                    };
                });
            },
            handlePlaceBet: () => {
                console.log('Placing bet:')
            },
            syncServerData: (items) => {
                set((state) => ({
                    coupons: state.coupons.map(coupon => {
                        const serverItem = items.find(i =>
                            i.gameId === coupon.GameId &&
                            i.marketId === coupon.marketId &&
                            i.outcomeId === coupon.Type &&
                            normalizeParam(i.param) === normalizeParam(coupon.Param)
                        );

                        if (!serverItem) return coupon;
                        return {
                            ...coupon,
                            name: serverItem.name,
                            InstrumentId: serverItem.isRelation,
                            Coef: serverItem.coefficient,
                            Param: serverItem.param,
                            serverCoef: serverItem.coefficient,
                            suspended: serverItem.suspended,
                            gameStatus: serverItem.gameStatus,
                            finish: serverItem.finish,
                        };
                    })
                }));
            },
            setBetAmount: (GameId, marketId, Type, Param, amount) => {
                set((state) => ({
                    coupons: state.coupons.map(c => {
                        const isMatch =
                            c.GameId === GameId &&
                            c.marketId === marketId &&
                            c.Type === Type &&
                            normalizeParam(c.Param) === normalizeParam(Param);

                        if (!isMatch) return c;

                        return {
                            ...c,
                            betAmount: Number(amount)
                        };
                    })
                }));
            },
            getTotalStake: () => {
                return get().coupons.reduce(
                    (sum, c) => sum + (c.betAmount || 0),
                    0
                );
            },
            getTotalPotentialWin: () => {
                return get().coupons.reduce((sum, c) => {
                    const stake = c.betAmount || 0;
                    const coef = c.serverCoef || c.Coef || 0;

                    return sum + stake * coef;
                }, 0);
            },
            hasInstrument: () => {
                return get().coupons.some(c => c.InstrumentId === 1);
            },
            setBetMode: (mode: BetMode) => set({ betMode: mode }),
        }),
        {
            name: 'coupon-storage',
            partialize: (state) => ({
                coupons: state.coupons
            }),
            // ⭐ IMPORTANT — Rebuild Set After Load
            onRehydrateStorage: () => (state) => {
                if (!state) return;

                state.selectedSet = new Set(
                    state.coupons.map(c =>
                        getSelectionKey(
                            c.GameId,
                            c.marketId,
                            c.Type,
                            c.Param
                        )
                    )
                );
            }
        }
    ))
)