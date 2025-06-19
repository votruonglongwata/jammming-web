import { generateCodeChallenge, generateRandomString } from "../config/pkce";

const clientId = '9cadc247ee634265b68c5d118ac46480';
const redirectUri = 'https://jammming-web.vercel.app';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';


let accessToken = '';

const Spotify = {
    async getAccessToken() {
        if (accessToken) return accessToken;

        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            accessToken = storedToken;
            return accessToken;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const codeVerifier = localStorage.getItem('code_verifier');

            if (!codeVerifier) throw new Error('Missing code_verifier');

            const body = new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            });

            const response = await fetch(tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            });

            const data = await response.json();
            if (data.access_token) {
                accessToken = data.access_token;
                localStorage.setItem('access_token', accessToken);
                console.log('spotify.js: ', accessToken);

                return accessToken;
            } else {
                console.error('Failed to get token:', data);
                return null;
            }
        } else {
            const codeVerifier = generateRandomString(128);
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            localStorage.setItem('code_verifier', codeVerifier);

            const scopes = [
                'playlist-modify-public',
                'playlist-modify-private',
                'user-read-private'
            ];

            const authUrl = new URL('https://accounts.spotify.com/authorize');
            authUrl.searchParams.set('response_type', 'code');
            authUrl.searchParams.set('client_id', clientId);
            authUrl.searchParams.set('scope', scopes.join(' '));
            authUrl.searchParams.set('redirect_uri', redirectUri);
            authUrl.searchParams.set('code_challenge_method', 'S256');
            authUrl.searchParams.set('code_challenge', codeChallenge);

            window.location = authUrl;
        }
    },
};

export default Spotify;