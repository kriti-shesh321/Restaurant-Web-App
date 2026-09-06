import axios from "axios";
import { getToken } from "../auth/storage";
import { triggerUnauthorized } from "../auth/authEvents";


const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured");
}

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// attach JWT to authenticated requests
api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});

// handle expired/invalid JWTs
api.interceptors.response.use((response) => response,

    (error) => {
        if (error.response?.status === 401) {
            triggerUnauthorized();
        }

        return Promise.reject(error);
    }
);