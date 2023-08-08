import useClientStore from '@/components/client/store';
import { Game, GameRow } from '@/components/games/types';
import { Tables } from '@/types';
import { errorAlert } from '@/utils';
import { create } from 'zustand';

interface GameStoreData {
    loading: boolean;
    games: Record<string, Game>;
}

interface GameStoreFunctions {
    fetchGames: () => void;
    createGame: () => void;
    upsertGames: (game: GameRow) => void;
}

interface GameStoreState extends GameStoreData, GameStoreFunctions {}

const DEFAULT_DATA: GameStoreData = {
    loading: false,
    games: {},
};

const useGameStore = create<GameStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    fetchGames: async () => {
        const { supabase, userId } = useClientStore.getState();

        console.log(`[gameStore][fetchGames] trying to fetch games.....`);

        if (!supabase || get().loading) {
            console.log(
                `[gameStore][fetchGames] didn't fetch because no initInfo (or already loading)`
            );
            return;
        }

        set({ loading: true });

        const { data, error } = await supabase
            .from(Tables.GAMES)
            .select()
            .contains('participants', [userId])
            .order('created_at', { ascending: false });

        if (error) {
            set({ loading: false });
            errorAlert(error);
        }

        const gameRows: GameRow[] = (data || []).map((f) => f as GameRow);

        console.log(`[gameStore][fetchGames] fetched ${gameRows.length} gameRows`);

        set({
            loading: false,
            games: {}, // TODO
        });
    },

    createGame: () => {
        // TODO
    },

    upsertGames: async (gameRow: GameRow) => {
        console.log('[gameStore][upsertGames] gameSubscription update');

        const { supabase, userId } = useClientStore.getState();

        if (!supabase) {
            return;
        }

        // TODO
    },
}));

export default useGameStore;
