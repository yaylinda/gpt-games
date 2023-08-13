import {
    Game,
    GameAction,
    GameActionRow,
    GameActionType,
    GameParticipant,
    GameParticipantRow,
    GameParticipantStatus,
    GameRow,
    GameStatus,
    GameType,
} from '@/components/games/types';
import moment from 'moment';

/**
 *
 * @param gameRow
 */
export const gameAdapter = (gameRow: GameRow): Game => ({
    ...gameRow,
    createdAt: moment(gameRow.created_at),
    createdBy: gameRow.created_by,
    type: gameRow.type as GameType,
    status: gameRow.status as GameStatus,
    isMultiplayer: gameRow.is_multiplayer,
});

/**
 *
 * @param actionRow
 */
export const gameActionAdapter = (actionRow: GameActionRow): GameAction => ({
    ...actionRow,
    gameId: actionRow.game_id,
    userId: actionRow.user_id,
    action: actionRow.action as GameActionType,
    createdAt: moment(actionRow.created_at),
});

/**
 *
 * @param participantRow
 */
export const gameParticipantAdapter = (participantRow: GameParticipantRow): GameParticipant => ({
    gameId: participantRow.game_id,
    userId: participantRow.user_id,
    status: participantRow.status as GameParticipantStatus,
});
