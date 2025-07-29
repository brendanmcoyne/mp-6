export type User = {
    // Shared
    provider?: 'google' | 'github' | 'reddit' | 'spotify' | 'discord' | 'yahoo';

    // Google
    name?: string;
    email?: string;
    verified_email?: boolean;
    picture?: string;
    locale?: string;

    // GitHub
    login?: string;
    avatar_url?: string;
    html_url?: string;
    bio?: string;
    location?: string;
    blog?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
    created_at?: string;

    // Reddit
    id?: string;
    created?: number;
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
    discriminator?: string;

    // Yahoo
    sub?: string;
    email_verified?: boolean;
};
