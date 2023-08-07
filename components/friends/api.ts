import { RequestFriendRequest, RequestFriendResponse } from '@/components/friends/types';
import { SupabaseEdgeFunctions } from '@/types';
import { Database } from '@/types/generated';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 *
 * @param supabase
 * @param request
 */
export const requestFriend = async (
    supabase: SupabaseClient<Database>,
    request: RequestFriendRequest
): Promise<RequestFriendResponse> => {
    const { data, error } = await supabase.functions.invoke(SupabaseEdgeFunctions.REQUEST_FRIEND, {
        body: request,
    });

    console.info(`[requestFriend] data: ${JSON.stringify(data)}`);

    if (error) {
        console.error(`[requestFriend] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return data as RequestFriendResponse;
};
