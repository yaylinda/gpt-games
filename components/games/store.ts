import useClientStore from '@/components/client/store';
import { gameAdapter } from '@/components/games/adapters';
import { CreateGameInput, Game, GameRow, GameStatus } from '@/components/games/types';
import { Tables } from '@/types';
import { errorAlert, reduceToMapped } from '@/utils';
import { create } from 'zustand';

interface GameStoreData {
    loading: boolean;
    creating: boolean;
    games: Record<string, Game>;
    active: string[];
    waiting: string[];
    completed: string[];
}

interface GameStoreFunctions {
    fetchGames: () => void;
    createGame: (input: CreateGameInput) => Promise<boolean>;
    upsertGames: (game: GameRow) => void;
}

interface GameStoreState extends GameStoreData, GameStoreFunctions {}

const DEFAULT_DATA: GameStoreData = {
    loading: false,
    creating: false,
    games: {},
    active: [],
    waiting: [],
    completed: [],
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

        const gamesList: Game[] = (data || []).map((f) => gameAdapter(f as GameRow));

        console.log(`[gameStore][fetchGames] fetched ${gamesList.length} games`);

        set({
            loading: false,
            games: reduceToMapped(gamesList),
            active: gamesList.filter((g) => g.status === GameStatus.ACTIVE).map((g) => g.id),
            waiting: gamesList.filter((g) => g.status === GameStatus.WAITING).map((g) => g.id),
            completed: gamesList.filter((g) => g.status === GameStatus.COMPLETED).map((g) => g.id),
        });
    },

    createGame: async (input: CreateGameInput) => {
        const { supabase, userId } = useClientStore.getState();

        if (!supabase) {
            return false;
        }

        set({ creating: true });

        try {
            return true;
        } catch (e) {
            return false;
        } finally {
            set({ creating: false });
        }
    },

    upsertGames: async (gameRow: GameRow) => {
        set({ creating: false });
        console.log('[gameStore][upsertGames] gameSubscription update');
        set((state) => ({
            games: {
                ...state.games,
                [gameRow.id]: gameAdapter(gameRow),
            },
        }));

        // TODO - handle when game moves to different status
    },
}));

export default useGameStore;
