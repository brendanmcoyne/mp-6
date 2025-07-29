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
        params.append('client_id', process.env.YAHOO_CLIENT_ID!);
        params.append('client_secret', process.env.YAHOO_CLIENT_SECRET!);
        params.append('redirect_uri', process.env.YAHOO_REDIRECT_URI!);
        params.append('grant_type', 'authorization_code');

        console.log("Sending token exchange request to Yahoo with:");
        console.log({
            client_id: process.env.YAHOO_CLIENT_ID,
            redirect_uri: process.env.YAHOO_REDIRECT_URI,
            code,
        });

        const tokenRes = await fetch('https://api.login.yahoo.com/oauth2/get_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params,
        });

        const tokenText = await tokenRes.text();

        let tokenData;
        try {
            tokenData = JSON.parse(tokenText);
        } catch {
            console.error("Yahoo token response was not valid JSON:", tokenText);
            return new NextResponse("Error: Invalid token response from Yahoo", { status: 500 });
        }

        if (!tokenData.access_token) {
            console.error("Yahoo token response missing access_token:", tokenData);
            return new NextResponse("Error: No access token returned from Yahoo", { status: 500 });
        }

        const accessToken = tokenData.access_token;

        // Fetch user info from Yahoo OpenID endpoint
        const userRes = await fetch('https://api.login.yahoo.com/openid/v1/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const user = await userRes.json();

        if (!user || user.error) {
            console.error("Error fetching Yahoo user info:", user);
            return NextResponse.redirect(new URL('/', req.url));
        }

        const encodedUser = encodeURIComponent(JSON.stringify(user));
        const redirectUrl = new URL('/profile', req.nextUrl.origin);
        redirectUrl.searchParams.set('provider', 'yahoo');
        redirectUrl.searchParams.set('user', encodedUser);

        return NextResponse.redirect(redirectUrl);

    } catch (error) {
        console.error("Unhandled error in Yahoo callback:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
