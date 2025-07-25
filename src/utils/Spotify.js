import { generateCodeChallenge, generateRandomString } from "../config/pkce";

const clientId = '9cadc247ee634265b68c5d118ac46480';
const redirectUri = 'https://jammming-web.vercel.app';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const currentTime = Date.now();
const storedToken = localStorage.getItem('access_token');
const storedExpiration = localStorage.getItem('token_expiration');
let tokenExpirationTime = 0;


let accessToken = '';

const Spotify = {
    async getAccessToken() {
        if (accessToken) return accessToken;

        if (storedToken && storedExpiration && currentTime < parseInt(storedExpiration, 10)) {
            accessToken = storedToken;
            tokenExpirationTime = parseInt(storedExpiration, 10);
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
                const expiresIn = data.expires_in;
                tokenExpirationTime = Date.now() + expiresIn * 1000;

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('token_expiration', tokenExpirationTime.toString());

                window.history.replaceState({}, document.title, '/');

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