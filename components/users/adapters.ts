import { Person, Profile, ProfileRow } from '@/components/users/types';
import moment from 'moment';

/**
 *
 * @param id
 * @param profileMap
 */
export const personAdapter = (id: string, profileMap: Record<string, Profile>): Person => ({
    ...profileMap[id],
});

/**
 *
 * @param profile
 */
export const profileAdapter = (profile: ProfileRow): Profile => ({
    id: profile.id,
    username: profile.username,
    discriminator: profile.discriminator,
    createdAt: moment(profile.created_at),
    numChatCreditsTotal: profile.num_chat_credits_total,
    numChatCreditsUsed: profile.num_chat_credits_used,
    numFriends: profile.num_friends,
    initialMessageCredits: profile.initial_message_credits,
    email: profile.email,
});
