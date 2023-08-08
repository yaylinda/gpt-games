import { Database } from '@/types/db';
import moment from 'moment';

export type GameRow = Database['public']['Tables']['games']['Row'];
export type GameInsert = Database['public']['Tables']['games']['Insert'];
export type GameUpdate = Database['public']['Tables']['games']['Update'];

export interface Game {
    id: string;
    createdAt: moment.Moment;
    createdBy: string;
    type: GameType;
    status: GameStatus;
    participants: string[];
    name: string;
    isMultiplayer: boolean;
}

export enum GameType {
    MOVIE = 'MOVIE',
}

export enum GameStatus {
    ACTIVE = 'ACTIVE',
    WAITING = 'WAITING',
    COMPLETED = 'COMPLETED',
}
