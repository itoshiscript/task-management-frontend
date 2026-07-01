import axios from "axios";
import {useAuthStore} from "../store/authStore.ts";
import {QueryClient} from "@tanstack/react-query";

export const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

let queryClient: QueryClient | null = null;

export const setQueryClient = (client: QueryClient) => {
    queryClient = client;
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().clearUser();
            queryClient?.removeQueries({ queryKey: ["currentUser"] });
        }
        return Promise.reject(error);
    }
);