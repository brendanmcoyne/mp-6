import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.CLIENT_ID!;
    const redirectUri = 'https://mp-6-brown.vercel.app/api/auth/callback';
    const scope = 'openid email profile';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;

    return NextResponse.redirect(authUrl);
}