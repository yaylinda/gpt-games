import { Session } from '@supabase/gotrue-js';
import { produce } from 'immer';
import { create } from 'zustand';

interface StoreStateData {
    session: Session | null;
    isAuthDialogOpen: boolean;
}

interface StoreStateFunctions {
    setSession: (session: Session | null) => void;
    openAuthDialog: () => void;
    closeAuthDialog: () => void;
}

interface StoreState extends StoreStateData, StoreStateFunctions {}

const DEFAULT_DATA: StoreStateData = {
    session: null,
    isAuthDialogOpen: false,
};

const useStore = create<StoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    openAuthDialog: () => {
        set({ isAuthDialogOpen: true });
    },

    closeAuthDialog: () => {
        set({ isAuthDialogOpen: false });
    },

    setSession: (session: Session | null) => {
        set({ session });
    },
}));

export default useStore;
