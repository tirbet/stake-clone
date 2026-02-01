import type { User } from "@/types/auth";
import { create } from "zustand";


export const useUserStore = create<{
    user?: User;
    setUser: (user?: User) => void;
    clearUser: () => void;
}>((set) => ({
    user: undefined,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: undefined })
}));