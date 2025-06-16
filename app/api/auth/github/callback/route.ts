import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID!,
            client_secret: process.env.GITHUB_CLIENT_SECRET!,
            code,
            redirect_uri: process.env.GITHUB_REDIRECT_URI!,
        }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const userRes = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'User-Agent': 'mp-6-app',
        },
    });

    const user = await userRes.json();

    const encodedUser = encodeURIComponent(JSON.stringify(user));
    const redirectUrl = new URL('/profile', req.nextUrl.origin);
    redirectUrl.searchParams.set('user', encodedUser);
    redirectUrl.searchParams.set('provider', 'github'); // add this!
    return NextResponse.redirect(redirectUrl);
}