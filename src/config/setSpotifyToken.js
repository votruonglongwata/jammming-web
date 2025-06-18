import { SpotifyApi } from "./spotifyAPI";

export const setSpotifyAccessToken = (token) => {
    console.log('set spotify token:', token);

    SpotifyApi.defaults.headers['Authorization'] = `Bearer ${token}`;
}