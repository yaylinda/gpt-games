import { DialogType } from '@/types';
import { Session } from '@supabase/gotrue-js';
import { produce } from 'immer';
import { create } from 'zustand';

interface StoreStateData {
    session: Session | null;
    activeDialog: DialogType | null;
}

interface StoreStateFunctions {
    setSession: (session: Session | null) => void;
    openDialog: (dialogType: DialogType) => void;
    closeDialog: () => void;
}

interface StoreState extends StoreStateData, StoreStateFunctions {}

const DEFAULT_DATA: StoreStateData = {
    session: null,
    activeDialog: null,
};

const useStore = create<StoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    openDialog: (dialogType: DialogType) => {
        set({ activeDialog: dialogType });
    },

    closeDialog: () => {
        set({ activeDialog: null });
    },

    setSession: (session: Session | null) => {
        set({ session });
    },
}));

export default useStore;
