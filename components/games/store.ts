import { Game, GameRow } from '@/components/games/types';
import { Tables } from '@/types';
import { Database } from '@/types/db';
import { errorAlert } from '@/utils';
import { SupabaseClient } from '@supabase/supabase-js';
import { create } from 'zustand';

interface GameStoreData {
    initInfo: {
        userId: string;
        supabase: SupabaseClient<Database>;
    } | null;
    loading: boolean;
    games: Record<string, Game>;
}

interface GameStoreFunctions {
    init: (userId: string, supabase: SupabaseClient<Database>) => void;
    fetchGames: () => void;
    createGame: () => void;
    upsertGames: (game: GameRow) => void;
}

interface GameStoreState extends GameStoreData, GameStoreFunctions {}

const DEFAULT_DATA: GameStoreData = {
    initInfo: null,
    loading: false,
    games: {},
};

const useGameStore = create<GameStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    init: (userId: string, supabase: SupabaseClient<Database>) => {
        console.log(`[gameStore][init] initializing store...`);
        set({
            initInfo: {
                userId,
                supabase,
            },
        });
    },

    fetchGames: async () => {
        const initInfo = get().initInfo;

        console.log(`[gameStore][fetchGames] trying to fetch games.....`);

        if (!initInfo || get().loading) {
            console.log(
                `[gameStore][fetchGames] didn't fetch because no initInfo (or already loading)`
            );
            return;
        }

        const { userId, supabase } = initInfo;

        set({ loading: true });

        const { data, error } = await supabase.from(Tables.GAMES).select();

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

        const initInfo = get().initInfo;

        if (!initInfo) {
            return;
        }

        const { userId } = initInfo;

        // TODO
    },
}));

export default useGameStore;
