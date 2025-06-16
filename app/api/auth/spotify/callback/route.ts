import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) return NextResponse.redirect(new URL('/', req.url));

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' +
                Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID! + ':' + process.env.SPOTIFY_CLIENT_SECRET!
                ).toString('base64'),
        },
        body: new URLSearchParams({
            code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
        }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return NextResponse.redirect(new URL('/', req.url));

    const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
        },
    });

    const user = await userRes.json();
    if (!user) return NextResponse.redirect(new URL('/', req.url));

    const encodedUser = encodeURIComponent(JSON.stringify({ ...user, provider: 'spotify' }));
    const redirectUrl = new URL('/profile', req.nextUrl.origin);
    redirectUrl.searchParams.set('user', encodedUser);

    return NextResponse.redirect(redirectUrl);
}