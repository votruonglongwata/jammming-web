import axios from "axios";
import Spotify from "../utils/Spotify";

let accessToken = Spotify.getAccessToken();

export const SpotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})