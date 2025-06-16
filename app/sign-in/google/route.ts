import { NextResponse } from 'next/server';

export async function GET() {
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    console.log('GOOGLE_REDIRECT_URI:', redirectUri);

    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const scope = 'openid email profile';
    if (!redirectUri) {
        throw new Error('Missing GOOGLE_REDIRECT_URI env var');
    }

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&access_type=offline&prompt=consent`;

    return NextResponse.redirect(authUrl);
}