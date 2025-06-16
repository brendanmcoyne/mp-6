import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    console.log('REDDIT_CLIENT_ID:', process.env.REDDIT_CLIENT_ID);
    console.log('REDDIT_REDIRECT_URI:', process.env.REDDIT_REDIRECT_URI);
    const code = req.nextUrl.searchParams.get('code');
    if (!code) return NextResponse.redirect(new URL('/', req.url));

    const tokenRes = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.REDDIT_REDIRECT_URI!,
        }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) return NextResponse.redirect(new URL('/', req.url));

    const userRes = await fetch('https://oauth.reddit.com/api/v1/me', {
        headers: { Authorization: `bearer ${accessToken}` },
    });

    const user = await userRes.json();
    if (!user) return NextResponse.redirect(new URL('/', req.url));

    const userWithProvider = {
        ...user,
        provider: 'reddit',
    };

    const redirectUrl = new URL('/profile', req.nextUrl.origin);
    redirectUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(userWithProvider)));
    return NextResponse.redirect(redirectUrl);
}