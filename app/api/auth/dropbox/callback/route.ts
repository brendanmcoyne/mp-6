import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code');
        if (!code) {
            console.error("Missing authorization code in query params");
            return NextResponse.redirect(new URL('/', req.url));
        }

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.DROPBOX_CLIENT_ID!);
        params.append('client_secret', process.env.DROPBOX_CLIENT_SECRET!);
        params.append('redirect_uri', 'https://mp-6-brown.vercel.app/api/auth/dropbox/callback');
        params.append('grant_type', 'authorization_code');

        console.log("Sending token exchange request to Dropbox with:");
        console.log({
            client_id: process.env.DROPBOX_CLIENT_ID,
            redirect_uri: process.env.DROPBOX_REDIRECT_URI,
            code,
        });

        const tokenRes = await fetch('https://api.dropboxapi.com/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params,
        });

        const tokenText = await tokenRes.text();

        let tokenData;
        try {
            tokenData = JSON.parse(tokenText);
        } catch {
            console.error("Dropbox token response was not valid JSON:", tokenText);
            return new NextResponse("Error: Invalid token response from Dropbox", { status: 500 });
        }

        if (!tokenData.access_token) {
            console.error("Dropbox token response missing access_token:", tokenData);
            return new NextResponse("Error: No access token returned from Dropbox", { status: 500 });
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
            console.error("Error fetching Dropbox user info:", user);
            return NextResponse.redirect(new URL('/', req.url));
        }

        const encodedUser = encodeURIComponent(JSON.stringify(user));
        const redirectUrl = new URL('/profile', req.nextUrl.origin);
        redirectUrl.searchParams.set('provider', 'dropbox');
        redirectUrl.searchParams.set('user', encodedUser);

        return NextResponse.redirect(redirectUrl);

    } catch (error) {
        console.error("Unhandled error in Dropbox callback:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
