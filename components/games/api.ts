import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/_common/db';
import { Tables } from '@/_common/types';
import { GamePageData } from '@/components/games/types';
import {
    gameActionAdapter,
    gameAdapter,
    gameParticipantAdapter,
} from '@/components/games/adapters';

/**
 *
 * @param supabase
 * @param gameId
 */
export const fetchGame = async (
    supabase: SupabaseClient<Database>,
    gameId: string
): Promise<GamePageData> => {
    const { data, error } = await supabase
        .from(Tables.GAMES)
        .select('*, game_actions (*), game_participants (*)')
        .eq('id', gameId)
        .single();

    if (!data || error) {
        throw error;
    }

    return {
        game: gameAdapter(data),
        actions: data.game_actions.map(gameActionAdapter),
        participants: data.game_participants.map(gameParticipantAdapter),
    };
};
