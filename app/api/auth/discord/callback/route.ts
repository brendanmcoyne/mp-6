import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) return NextResponse.redirect(new URL('/', req.url));

    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID!,
            client_secret: process.env.DISCORD_CLIENT_SECRET!,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI!,
            scope: 'identify email',
        }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) return NextResponse.redirect(new URL('/', req.url));

    const userRes = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const user = await userRes.json();
    if (!user) return NextResponse.redirect(new URL('/', req.url));

    const userWithProvider = {
        ...user,
        provider: 'discord',
    };

    const redirectUrl = new URL('/profile', req.nextUrl.origin);
    redirectUrl.searchParams.set('provider', 'discord');
    redirectUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(userWithProvider)));
    return NextResponse.redirect(redirectUrl);
}
