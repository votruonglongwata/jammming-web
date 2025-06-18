import axios from "axios";

let accessToken;
export const SpotifyApi = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
})