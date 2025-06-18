import axios from "axios";
import { SpotifyApi } from "../config/spotifyAPI";


const getRequest = async (url) => {
    const res = await SpotifyApi.get(`${url}`);
    return res;
};

// [GET] -> params
const getRequestParams = async (url, params) => {
    const res = await SpotifyApi.get(`${url}`, { params: params });
    return res;
};

// [POST] -> params
const postRequestParams = async (url, params) => {
    const res = await SpotifyApi.post(`${url}`, { params: params });
    return res;
};

export { getRequest, getRequestParams, postRequestParams }