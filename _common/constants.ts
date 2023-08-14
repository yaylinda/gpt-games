export const APP_PLATFORM = 'gpt-games';
export const SITE_NAME = 'GPT Games';
export const SITE_DESCRIPTION = 'Play games powered by GPT';
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{4,50}$/;
export const USERNAME_WITH_DISCRIM_REGEX = /^[a-zA-Z0-9._-]{4,50}#\d{4}$/;
export const GAME_NAME_REGEX = /^[ a-zA-Z0-9._-]{4,50}$/;
export const MIN_PASSWORD_LENGTH = 4;
export const DUPLICATE_EMAIL = 'User already registered';
export const DUPLICATE_USERNAME =
    'duplicate key value violates unique constraint "unique_username_discriminator"';
export const INVALID_LOGIN = 'Invalid login credentials';

export const AUTH_ERROR_MESSAGES: { [key in string]: string } = {
    [INVALID_LOGIN]: 'Incorrect email and/or password.',
    [DUPLICATE_EMAIL]: 'There is already an account linked to this email.',
    [DUPLICATE_USERNAME]: 'That username has already been taken.',
};

export const GENERIC_ERROR_MESSAGE = 'Oops! Something went wrong. Please try again.';
