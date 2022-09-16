import request from 'request';
import type { SpotfiyRes } from './types';

async function GetKey(): Promise<string | undefined> {
    const clientId = process.env['SPOTIFY_CLIENT_ID'];
    const clientSecret = process.env['SPOTIFY_CLIENT_SECRET'];
    if (!clientId || !clientSecret) return;

    const requestData = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(`${clientId}:${clientSecret}`).toString('base64')),
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    }
    return new Promise((resolve, _) => {
        request.post(requestData, (_, __, body) => {
            resolve(body.access_token);
        });
    });
}

async function GetSpotifyLink(songAuthor: string, songName: string): Promise<SpotfiyRes | undefined> {
    const token = await GetKey();

    if (!token) return;

    const data = {
        url: `https://api.spotify.com/v1/search?q=track:${songName} artist:${songAuthor}&type=track`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    return new Promise((resolve, _) => {
        request.get(data, (_, __, body) => {
            resolve(JSON.parse(body));
        });
    });
}

export { GetSpotifyLink };