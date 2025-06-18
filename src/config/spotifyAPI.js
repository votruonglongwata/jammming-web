import axios from "axios";

let accessToken = localStorage.getItem("access_token");

export const SpotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
})