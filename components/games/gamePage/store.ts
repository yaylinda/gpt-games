import { Game, GameAction, GameParticipant } from '@/components/games/types';
import { create } from 'zustand';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/_common/db';
import { fetchGame } from '@/components/games/api';
import useClientStore from '@/components/client/store';
import useProfileStore from '@/components/users/store';

interface GamePageStoreData {
    loading: boolean;
    game: Game | null;
    actions: GameAction[];
    participants: GameParticipant[];
    error: string;
}

interface GamePageStoreFunctions {
    fetchGame: (gameId: string) => void;
}

interface GamePageStoreState extends GamePageStoreData, GamePageStoreFunctions {}

const DEFAULT_DATA: GamePageStoreData = {
    loading: false,
    game: null,
    actions: [],
    participants: [],
    error: '',
};

const useGamePageStore = create<GamePageStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    fetchGame: async (gameId: string) => {
        const { supabase } = useClientStore.getState();

        if (!supabase) {
            return {};
        }

        set({ loading: true });

        try {
            const { game, actions, participants } = await fetchGame(supabase, gameId);
            await useProfileStore.getState().fetchProfiles(game.participants);
            set({ game, actions, participants });
        } catch (e) {
            set({ error: JSON.stringify(e) });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useGamePageStore;
