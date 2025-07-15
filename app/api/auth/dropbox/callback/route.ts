import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.DROPBOX_CLIENT_ID!);
    params.append('client_secret', process.env.DROPBOX_CLIENT_SECRET!);
    params.append('redirect_uri', process.env.DROPBOX_REDIRECT_URI!);
    params.append('grant_type', 'authorization_code');

    const tokenRes = await fetch('https://api.dropboxapi.com/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const accessToken = tokenData.access_token;

    const userRes = await fetch('https://api.dropboxapi.com/2/users/get_current_account', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    const user = await userRes.json();

    if (!user || user.error) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const encodedUser = encodeURIComponent(JSON.stringify(user));
    const redirectUrl = new URL('/profile', req.nextUrl.origin);
    redirectUrl.searchParams.set('provider', 'dropbox');
    redirectUrl.searchParams.set('user', encodedUser);

    return NextResponse.redirect(redirectUrl);
}