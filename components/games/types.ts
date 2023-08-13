import { Database, Json } from '@/_common/db';
import moment from 'moment';

export type GameRow = Database['public']['Tables']['games']['Row'];
export type GameInsert = Database['public']['Tables']['games']['Insert'];
export type GameUpdate = Database['public']['Tables']['games']['Update'];

export type GameActionRow = Database['public']['Tables']['game_actions']['Row'];

export type GameParticipantRow = Database['public']['Tables']['game_participants']['Row'];

export interface GamePageData {
    game: Game;
    actions: GameAction[];
    participants: GameParticipant[];
}

export interface Game {
    id: string;
    createdAt: moment.Moment;
    createdBy: string;
    type: GameType;
    status: GameStatus;
    participants: string[];
    name: string;
    isMultiplayer: boolean;
    metadata: Json;
}

export interface GameAction {
    id: string;
    gameId: string;
    userId: string;
    action: GameActionType;
    metadata: Json;
    createdAt: moment.Moment;
}

export interface GameParticipant {
    gameId: string;
    userId: string;
    status: GameParticipantStatus;
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

export enum GameActionType {
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
