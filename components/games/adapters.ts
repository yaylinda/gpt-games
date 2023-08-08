import { Game, GameRow } from '@/components/games/types';
import moment from 'moment';

/**
 *
 * @param gameRow
 */
export const gameAdapter = (gameRow: GameRow): Game => ({
    id: gameRow.id,
    createdAt: moment(gameRow.created_at),
    createdBy: gameRow.created_by,
    type: gameRow.type,
    status: gameRow.status,
    participants: gameRow.participants,
    name: gameRow.name,
    isMultiplayer: gameRow.is_multiplayer,
});
