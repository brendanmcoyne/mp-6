export type User = {
    // Shared
    provider?: 'google' | 'github' | 'reddit' | 'spotify' | 'discord' | 'yahoo';

    // Google-specific
    name?: string;
    email?: string;
    verified_email?: boolean;
    picture?: string;

    // GitHub-specific
    login?: string;
    avatar_url?: string;
    html_url?: string;
    bio?: string;
    location?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
    created_at?: string;

    // Reddit-specific
    id?: string;
    reddit_name?: string;

    // Spotify-specific
    display_name?: string;

    // Discord-specific
    username?: string;
    discriminator?: string;

    // Dropbox-specific
    sub?: string;
    email_verified?: boolean;
};
