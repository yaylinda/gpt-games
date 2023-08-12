import { GameType, GameTypeMetadataMapping } from '@/components/games/types';
import { Json } from '@/_common/db';

export const getGameMetadata = <T extends keyof GameTypeMetadataMapping>(type: T): Json => {
    switch (type) {
        case GameType.MOVIE:
            return {
                movies: [],
            };
        default:
            return {};
    }
};
