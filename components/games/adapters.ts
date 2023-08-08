import { Game, GameRow, GameStatus, GameType } from '@/components/games/types';
import moment from 'moment';

/**
 *
 * @param gameRow
 */
export const gameAdapter = (gameRow: GameRow): Game => ({
    id: gameRow.id,
    createdAt: moment(gameRow.created_at),
    createdBy: gameRow.created_by,
    type: gameRow.type as GameType,
    status: gameRow.status as GameStatus,
    participants: gameRow.participants,
    name: gameRow.name,
    isMultiplayer: gameRow.is_multiplayer,
});
