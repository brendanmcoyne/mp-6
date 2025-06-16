import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.REDDIT_CLIENT_ID!;
    const redirectUri = process.env.REDDIT_REDIRECT_URI!;
    const scope = 'identity';

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=randomstring&redirect_uri=${redirectUri}&duration=temporary&scope=${scope}`;

    return NextResponse.redirect(authUrl);
}