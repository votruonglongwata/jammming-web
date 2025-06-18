const clientId = '9cadc247ee634265b68c5d118ac46480';
const redirectUri = 'https://jammming-web.vercel.app';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        // Kiểm tra token có trong URL không
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenMatch && expiresInMatch) {
            accessToken = tokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Xóa token khỏi URL sau khi lấy
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else {
            // Nếu chưa có token thì redirect đến Spotify login
            const scope = 'playlist-modify-public playlist-modify-private';
            const authUrl = `https://accounts.spotify.com/authorize?` +
                `client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scope)}` +
                `&redirect_uri=${encodeURIComponent(redirectUri)}`;

            window.location = authUrl;
        }
    }
};

export default Spotify;