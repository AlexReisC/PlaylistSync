import { URLSearchParams } from 'node:url';

async function getSpotifyAccessToken(){

    const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
    const responseToken = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        })
    });

    if (!responseToken.ok) {
        const errorDetails = await responseToken.text();
        throw new Error(`Erro ao obter token do Spotify: ${errorDetails}`);
    }

    return await responseToken.json();
}

