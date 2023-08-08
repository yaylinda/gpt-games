import { profileAdapter } from '@/components/users/adapters';
import { Profile, ProfileRow } from '@/components/users/types';
import { Tables } from '@/types';
import { Database } from '@/types/db';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 *
 * @param supabase
 * @param userIds
 */
export const fetchProfiles = async (
    supabase: SupabaseClient<Database>,
    userIds: string[]
): Promise<Profile[]> => {
    const { data, error } = await supabase.from(Tables.PROFILES).select().in('id', userIds);

    if (error) {
        console.error(`[fetchProfiles] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return (data || []).map((p) => profileAdapter(p as ProfileRow));
};

/**
 *
 * @param supabase
 * @param userId
 * @param usernameWithDiscriminator
 */
export const searchProfiles = async (
    supabase: SupabaseClient<Database>,
    userId: string,
    usernameWithDiscriminator: string
): Promise<Profile[]> => {
    const parts = usernameWithDiscriminator.split('#');

    const username = parts[0];

    let query = supabase
        .from(Tables.PROFILES)
        .select()
        .like('username', `%${username.trim()}%`)
        .not('id', 'eq', userId);

    if (parts.length > 1) {
        query = query.eq('discriminator', parts[1].trim());
    }

    const { data, error } = await query;

    if (error) {
        console.error(`[findProfile] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return (data || []).map((p) => profileAdapter(p as ProfileRow));
};
