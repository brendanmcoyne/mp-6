import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
    const scope = 'user-read-email user-read-private';
    const state = 'randomstring'; // Can be more securely generated

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${state}`;

    return NextResponse.redirect(authUrl);
}