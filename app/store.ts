import { produce } from 'immer';
import { create } from 'zustand';

interface StoreStateData {
    isLoggedIn: boolean;
    isAuthDialogOpen: boolean;
}

interface StoreStateFunctions {
    login: () => void;
    register: () => void;
    logout: () => void;
    openAuthDialog: () => void;
    closeAuthDialog: () => void;
}

interface StoreState extends StoreStateData, StoreStateFunctions {}

const DEFAULT_DATA: StoreStateData = {
    isLoggedIn: false,
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

    login: () => {
        // TODO - implement
    },

    register: () => {
        // TODO - implememnt
    },

    logout: () => {
        // TODO - implememnt
    },

}));

export default useStore;
