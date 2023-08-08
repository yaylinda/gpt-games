import { Person, Profile } from '@/components/users/types';
import { APIRequest } from '@/types';
import moment from 'moment';
import { Database } from '@/types/db';

export type FriendRow = Database['public']['Tables']['friends']['Row'];
export type FriendInsert = Database['public']['Tables']['friends']['Insert'];
export type FriendUpdate = Database['public']['Tables']['friends']['Update'];

export enum FriendListType {
    FRIENDS = 'friends',
    SENT = 'friendRequestsSent',
    RECEIVED = 'friendRequestsReceived',
    USER_DENIED = 'friendRequestsUserDenied',
    OTHER_DENIED = 'friendRequestsOtherDenied',
}

export interface Friend extends Person {
    acceptedOn: moment.Moment;
}

export interface FriendRequest {
    friendPair: string;
    requester: Profile;
    requestee: Profile;
    requestedOn: moment.Moment;
    respondedOn: moment.Moment | null;
}

export interface RequestFriendRequest extends APIRequest {
    userId: string;
    requesteeUsernameDiscriminator: string;
}

export interface ResponseWithStatusAndMessage {
    success: boolean;
    message: string;
}
