import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.DISCORD_CLIENT_ID!;
    const redirectUri = process.env.DISCORD_REDIRECT_URI!;
    const scope = 'identify email';
    const state = 'randomstring'; // You can generate a secure random string for production

    const authUrl = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${state}`;

    return NextResponse.redirect(authUrl);
}