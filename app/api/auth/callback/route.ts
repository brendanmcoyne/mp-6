import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    const provider = req.nextUrl.searchParams.get('provider'); // e.g., 'google' or 'github'

    if (!code || !provider) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    let tokenUrl = '';
    let userInfoUrl = '';
    const params = new URLSearchParams();

    if (provider === 'google') {
        tokenUrl = 'https://oauth2.googleapis.com/token';
        userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';

        params.append('client_id', process.env.GOOGLE_CLIENT_ID!);
        params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET!);
        params.append('redirect_uri', process.env.OAUTH_REDIRECT_GOOGLE!);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
    } else if (provider === 'github') {
        tokenUrl = 'https://github.com/login/oauth/access_token';
        userInfoUrl = 'https://api.github.com/user';

        params.append('client_id', process.env.GITHUB_CLIENT_ID!);
        params.append('client_secret', process.env.GITHUB_CLIENT_SECRET!);
        params.append('code', code);
        params.append('redirect_uri', process.env.OAUTH_REDIRECT_GITHUB!);
    } else {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const tokenRes = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: params,
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const userRes = await fetch(userInfoUrl, {
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
    redirectUrl.searchParams.set('user', encodedUser);
    return NextResponse.redirect(redirectUrl);
}
