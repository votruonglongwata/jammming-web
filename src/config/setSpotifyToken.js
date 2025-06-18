import { SpotifyApi } from "./spotifyAPI";

export const setSpotifyAccessToken = (token) => {
    SpotifyApi.defaults.headers['Authorization'] = `Bearer ${token}`;
}