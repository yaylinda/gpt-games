import { DialogType } from '@/_common/types';
import { Database } from '@/_common/db';
import { SupabaseClient } from '@supabase/supabase-js';
import { create } from 'zustand';

interface ClientStoreStateData {
    // session: Session | null;
    isInit: boolean;
    userId: string;
    supabase: SupabaseClient<Database> | null;
    activeDialog: DialogType | null;
}

interface ClientStoreStateFunctions {
    // setSession: (session: Session | null) => void;
    init: (userId: string, supabase: SupabaseClient<Database>) => void;
    openDialog: (dialogType: DialogType) => void;
    closeDialog: () => void;
}

interface ClientStoreState extends ClientStoreStateData, ClientStoreStateFunctions {}

const DEFAULT_DATA: ClientStoreStateData = {
    isInit: false,
    userId: '',
    supabase: null,
    activeDialog: null,
};

const useClientStore = create<ClientStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    init: (userId: string, supabase: SupabaseClient<Database>) => {
        set({
            isInit: true,
            userId,
            supabase,
        });
    },

    openDialog: (dialogType: DialogType) => {
        set({ activeDialog: dialogType });
    },

    closeDialog: () => {
        set({ activeDialog: null });
    },
}));

export default useClientStore;
