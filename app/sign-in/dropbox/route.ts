import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.DROPBOX_CLIENT_ID!;
    const redirectUri = process.env.DROPBOX_REDIRECT_URI!;
    const state = 'randomstring';

    const authUrl = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&state=${state}&token_access_type=offline`;

    return NextResponse.redirect(authUrl);
}