export type GoogleUser = {
    id: string;
    email: string;
    name: string;
    picture: string;        // URL to the user's profile picture
    given_name?: string;    // First name
    family_name?: string;   // Last name
    verified_email: boolean; // Whether the user's email is verified
};
