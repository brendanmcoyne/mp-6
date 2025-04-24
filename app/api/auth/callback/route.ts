import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) return NextResponse.redirect('/');

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!);
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET!);
    params.append('redirect_uri', process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!);
    params.append('grant_type', 'authorization_code');

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const user = await userRes.json();
    const encodedUser = encodeURIComponent(JSON.stringify(user));

    return NextResponse.redirect(`/profile?user=${encodedUser}`);
}