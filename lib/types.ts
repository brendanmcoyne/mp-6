export type User = {
    // Shared
    provider?: 'google' | 'github' | 'reddit' | 'spotify' | 'discord';

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
    id?: string;
    reddit_name?: string;
    display_name?: string;
    username?: string;
    discriminator?: string;
};

