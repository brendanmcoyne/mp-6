import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) return NextResponse.redirect(new URL('/', req.url));

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
        }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) return NextResponse.redirect(new URL('/', req.url));

    const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = await userRes.json();
    if (!user) return NextResponse.redirect(new URL('/', req.url));

    const userWithProvider = {
        ...user,
        provider: 'spotify',
    };

    const redirectUrl = new URL('/profile', req.nextUrl.origin);
    redirectUrl.searchParams.set('provider', 'spotify');
    redirectUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(userWithProvider)));
    return NextResponse.redirect(redirectUrl);
}
