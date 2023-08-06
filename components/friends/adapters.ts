import { Friend, FriendRequest, FriendRow } from '@/components/friends/types';
import { personAdapter } from '@/components/users/adapters';
import { Profile } from '@/components/users/types';
import moment from 'moment';

/**
 *
 * @param id
 * @param friendRow
 * @param profileMap
 */
export const friendAdapter = (
    id: string,
    friendRow: FriendRow,
    profileMap: Record<string, Profile>
): Friend => ({
    ...personAdapter(id, profileMap),
    acceptedOn: moment(friendRow.responded_on),
});

/**
 *
 * @param friendRow
 * @param profileMap
 */
export const friendRequestAdapter = (
    friendRow: FriendRow,
    profileMap: Record<string, Profile>
): FriendRequest => ({
    friendPair: friendRow.friend_pair,
    requester: profileMap[friendRow.requester],
    requestee: profileMap[friendRow.requestee],
    requestedOn: moment(friendRow.requested_on),
    respondedOn: friendRow.responded_on ? moment(friendRow.responded_on) : null,
});
