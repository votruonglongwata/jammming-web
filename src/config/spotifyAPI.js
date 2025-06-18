import axios from "axios";


export const SpotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

SpotifyApi.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});