import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.GITHUB_CLIENT_ID!;
    const redirectUri = encodeURIComponent(process.env.OAUTH_REDIRECT_GITHUB!);

    const scope = 'user';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    return NextResponse.redirect(authUrl);
}