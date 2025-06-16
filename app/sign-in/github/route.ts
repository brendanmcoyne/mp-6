import { NextResponse } from 'next/server';

export async function GET() {
    console.log('GITHUB_CLIENT_ID in runtime:', process.env.GITHUB_CLIENT_ID);

    const clientId = process.env.GITHUB_CLIENT_ID!;
    const redirectUri = 'https://mp-6-brown.vercel.app/api/auth/callback?provider=github';
    const scope = 'user';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    return NextResponse.redirect(authUrl);
}