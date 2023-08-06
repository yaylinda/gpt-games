import { profileAdapter } from '@/components/users/adapters';
import { Profile, ProfileRow } from '@/components/users/types';
import { Tables } from '@/types';
import { Database } from '@/types/generated';
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
 * @param fullUsername
 */
export const findProfile = async (
    supabase: SupabaseClient<Database>,
    fullUsername: string
): Promise<Profile | null> => {
    const [username, discriminator] = fullUsername.split('#');

    const { data, error } = await supabase
        .from(Tables.PROFILES)
        .select()
        .eq('username', username.trim())
        .eq('discriminator', discriminator.trim())
        .maybeSingle();

    if (!data) {
        return null;
    }

    if (error) {
        console.error(`[findProfile] error: ${JSON.stringify(error)}`);
        throw error;
    }

    return profileAdapter(data as ProfileRow);
};
