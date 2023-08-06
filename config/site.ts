export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'GPT Games',
    description: 'Play games powered by GPT',
    regex: {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        username: /^[a-zA-Z0-9._-]{4,50}$/,
        usernameWithDiscriminator: /^[a-zA-Z0-9._-]{4,50}#\d{4}$/,
    },
};
