import { create } from "zustand";

export const useSportStatus = create<{
    status: "live" | "upcoming";
    setStatus: (s: "live" | "upcoming") => void;
}>((set) => ({
    status: "upcoming",
    setStatus: (s) => set({ status: s }),
}));