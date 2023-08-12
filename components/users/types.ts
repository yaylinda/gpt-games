import { Database } from '@/_common/db';
import moment from 'moment';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export interface UserMetadata {
    username: string;
    discriminator: string;
    platform: string;
}

export interface Person {
    id: string;
    username: string;
    discriminator: string;
}

export interface Profile extends Person {
    createdAt: moment.Moment;
    numChatCreditsUsed: number;
    numChatCreditsTotal: number;
    numFriends: number;
    initialMessageCredits: number;
    email: string;
}
