export type User = {
    // Shared
    provider?: 'google' | 'github' | 'reddit' | 'spotify' | 'discord' | 'yahoo';

    // Google
    name?: string;
    email?: string;
    verified_email?: boolean;
    picture?: string;

    // GitHub
    login?: string;
    html_url?: string;
    bio?: string;
    public_repos?: number;
    followers?: number;
    following?: number;

    // Reddit
    id?: string;
    link_karma?: number;
    comment_karma?: number;
    verified?: boolean;
    is_gold?: boolean;

    // Spotify
    display_name?: string;
    country?: string;
    product?: string;
    external_urls?: {
        spotify?: string;
    };

    // Discord
    username?: string;
    locale?: string;

    // Yahoo
    sub?: string;
    email_verified?: boolean;
};
