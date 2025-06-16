export async function GET() {
    console.log('REDDIT_CLIENT_ID:', process.env.REDDIT_CLIENT_ID);
    console.log('REDDIT_REDIRECT_URI:', process.env.REDDIT_REDIRECT_URI);

    const clientId = process.env.REDDIT_CLIENT_ID;
    const redirectUri = process.env.REDDIT_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        return new Response('Missing environment variables', { status: 500 });
    }

    const state = 'randomstring';
    const scope = 'identity';
    const duration = 'temporary';

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}&duration=${duration}&scope=${scope}`;

    return new Response(null, {
        status: 302,
        headers: {
            Location: authUrl,
        },
    });
}