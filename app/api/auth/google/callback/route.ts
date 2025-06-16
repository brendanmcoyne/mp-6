import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.CLIENT_ID!);
    params.append('client_secret', process.env.CLIENT_SECRET!);
    params.append('redirect_uri', process.env.OAUTH_REDIRECT!);
    params.append('grant_type', 'authorization_code');

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const accessToken = tokenData.access_token;

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const user = await userRes.json();

    if (!user) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const encodedUser = encodeURIComponent(JSON.stringify(user));
    const redirectUrl = new URL('/profile', req.nextUrl.origin);
    redirectUrl.searchParams.set('provider', 'google');
    return NextResponse.redirect(redirectUrl);
}