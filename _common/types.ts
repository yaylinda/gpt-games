export enum DialogType {
    AUTH = 'AUTH',
    NEW_GAME = 'NEW_GAME',
    NEW_CHAT = 'NEW_CHAT',
    NEW_FRIEND = 'NEW_FRIEND',
}

export enum Tables {
    CHATS = 'chats',
    CHAT_MESSAGES = 'chat_messages',
    FRIENDS = 'friends',
    PROFILES = 'profiles',
    ADMIN_SETTINGS = 'admin_settings',
    PURCHASES = 'purchases',
    GAMES = 'games',
    GAME_ACTIONS = 'game_actions',
    GAME_PARTICIPANTS = 'game_participants',
}

export enum SupabaseEdgeFunctions {
    CREATE_CHAT = 'createChat',
    SEND_USER_MESSAGE = 'sendUserMessage',
    EMBED_MESSAGE = 'embedMessage',
    GENERATE_RESPONSE_MESSAGE = 'generateResponseMessage',
    REQUEST_FRIEND = 'requestFriend',
    CREATE_GAME = 'createGame',
}

///////////////////////////////////////////////////////////
// api request
///////////////////////////////////////////////////////////

export interface APIRequest {
    correlationId: string;
}

///////////////////////////////////////////////////////////
// api response
///////////////////////////////////////////////////////////

export type APIResponse<D, E> = APISuccessResponse<D> | APIErrorResponse<E>;

export interface APISuccessResponse<T> {
    data: T;
    error: null;
}

export interface APIErrorResponse<T> {
    data: null;
    error: T;
}
