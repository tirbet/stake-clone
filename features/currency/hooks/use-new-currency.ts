import { create } from 'zustand';

type NewCurrencyState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewCurrency= create<NewCurrencyState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))