export type GoogleUser = {
    id: string;             // Unique ID for the user
    email: string;          // User's email
    name: string;           // User's full name
    picture: string;        // URL to the user's profile picture
    given_name?: string;    // First name
    family_name?: string;   // Last name
    locale?: string;        // User's locale (e.g., en-US)
    sub: string;            // The user's unique ID (alternative to `id`)
    verified_email: boolean; // Whether the user's email is verified
    hd?: string;            // Hosted domain (useful for Google Workspace users)
};
