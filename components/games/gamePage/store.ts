import useClientStore from '@/components/client/store';
import { ResponseWithStatusAndMessage } from '@/components/friends/types';
import { gameAdapter } from '@/components/games/adapters';
import { CreateGameInput, Game, GameInsert, GameRow, GameStatus } from '@/components/games/types';
import { getGameMetadata } from '@/components/games/utils';
import { Tables } from '@/types';
import { errorAlert, reduceToMapped } from '@/utils';
import { create } from 'zustand';

interface GamePageStoreData {
    loading: boolean;
    game: Game | null;
}

interface GamePageStoreFunctions {
    init: () => void;
}

interface GamePageStoreState extends GamePageStoreData, GamePageStoreFunctions {}

const DEFAULT_DATA: GamePageStoreData = {
    loading: false,
    game: null,
};

const useGamePageStore = create<GamePageStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    init: () => {},
}));

export default useGamePageStore;
