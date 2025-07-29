// sign-in/yahoo/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.YAHOO_CLIENT_ID!;
    const redirectUri = process.env.YAHOO_REDIRECT_URI!;
    const state = 'randomstring'; // You should generate a real random string per session for security

    const scope = 'openid email profile'; // Make sure this matches the API Permissions you enabled

    const authUrl = `https://api.login.yahoo.com/oauth2/request_auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&state=${state}&scope=${encodeURIComponent(scope)}`;

    return NextResponse.redirect(authUrl);
}
