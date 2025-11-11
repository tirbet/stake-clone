import { create } from 'zustand';
import type { GameGroup } from '@/types/sport-type';

type GameGroupState = {
    data: GameGroup | null;
    setSelectedGroup: (data: GameGroup | null) => void;
};

export const useGameGroupStore = create<GameGroupState>((set) => ({
    data: null,
    setSelectedGroup: (data) => set({ data: data }),
}));
