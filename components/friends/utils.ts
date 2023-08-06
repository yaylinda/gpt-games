import { FriendRow } from '@/types/db';

export const getUniqueFriendRequestId = (uid1: string, uid2: string): string =>
    [uid1, uid2].sort().join('+');

export const isFriendRow = (friendRow: FriendRow): boolean => !!friendRow.request_accepted;

export const isFriendRequestReceivedRow = (friendRow: FriendRow, userId: string): boolean =>
    !friendRow.request_accepted &&
    friendRow.responded_on === null &&
    friendRow.requester !== userId &&
    friendRow.requestee === userId;

export const isFriendRequestSentRow = (friendRow: FriendRow, userId: string): boolean =>
    !friendRow.request_accepted &&
    friendRow.responded_on === null &&
    friendRow.requester === userId &&
    friendRow.requestee !== userId;

export const isFriendRequestDeniedByUserRow = (friendRow: FriendRow, userId: string): boolean =>
    !friendRow.request_accepted &&
    friendRow.responded_on !== null &&
    friendRow.requester !== userId &&
    friendRow.requestee === userId;

export const isFriendRequestDeniedByOtherRow = (friendRow: FriendRow, userId: string): boolean =>
    !friendRow.request_accepted &&
    friendRow.responded_on !== null &&
    friendRow.requester === userId &&
    friendRow.requestee !== userId;
