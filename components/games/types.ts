import { Database } from '@/_common/db';
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

export interface CreateGameInput {
    name: string;
    type: GameType | null;
    isMultiplayer: boolean;
    participants: string[];
}

export enum GameType {
    MOVIE = 'MOVIE', // TODO - other game types
}

export enum GameStatus {
    ACTIVE = 'ACTIVE',
    WAITING = 'WAITING',
    COMPLETED = 'COMPLETED',
}

export enum GameParticipantStatus {
    INVITED = 'INVITED',
    READY = 'READY',
}

export enum GameAction {
    CREATED = 'CREATED',
    READY = 'READY',
    STARTED = 'STARTED',
    START_TURN = 'START_TURN',
    END_TURN = 'END_TURN',
    END_GAME = 'END_GAME',
}

export interface GameTypeMetadataMapping {
    [GameType.MOVIE]: GameTypeMovieMetadata;
    // TODO - other game types
    default: object;
}

export interface GameTypeMovieMetadata {
    movies: string[];
    // TODO - other movie game metadata
}
