import useClientStore from '@/components/client/store';
import { ResponseWithStatusAndMessage } from '@/components/friends/types';
import { gameAdapter } from '@/components/games/adapters';
import { CreateGameInput, Game, GameInsert, GameRow, GameStatus } from '@/components/games/types';
import { getGameMetadata } from '@/components/games/utils';
import { Tables } from '@/_common/types';
import { errorAlert, reduceToMapped } from '@/_common/utils';
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
    createGame: (input: CreateGameInput) => Promise<ResponseWithStatusAndMessage>;
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

    createGame: async (input: CreateGameInput): Promise<ResponseWithStatusAndMessage> => {
        const { supabase, userId } = useClientStore.getState();

        if (!supabase) {
            return {
                success: false,
                message: 'Oops! Something went wrong.',
            };
        }

        set({ creating: true });

        try {
            const row: GameInsert = {
                created_by: userId, // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                type: input.type!,
                status: GameStatus.WAITING,
                participants: [userId, ...input.participants],
                name: input.name, // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                metadata: getGameMetadata(input.type!),
            };

            const { data, error } = await supabase
                .from(Tables.GAMES)
                .insert(row)
                .select('id')
                .single();

            if (!data || error) {
                return {
                    success: false,
                    message: error.message || 'Oops! Something went wrong.',
                };
            }

            return {
                success: true,
                message: 'Successfully started a new game!',
                id: data.id,
            };
        } catch (e) {
            return {
                success: false, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                message: e.message || 'Oops! Something went wrong.',
            };
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
