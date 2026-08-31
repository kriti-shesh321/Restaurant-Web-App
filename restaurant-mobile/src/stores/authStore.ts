import { create } from "zustand";
import { getToken, removeToken, saveToken } from "../auth/storage";

import {
    login as loginRequest,
    signup as signupRequest,
    getCurrentUser
} from "../api/auth";

import type { User } from "../types/auth";
import { setUnauthorizedHandler } from "../auth/authEvents";

interface AuthState {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    isInitialized: boolean;

    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;

    initialize: () => Promise<void>;

    logout: () => Promise<void>;

    handleUnauthorized: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    isLoading: false,
    isInitialized: false,

    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const data = await loginRequest(email, password);

            await saveToken(data.token);

            const user = await getCurrentUser();

            set({
                token: data.token,
                user,
                isLoading: false,
            });
        } catch (error) {
            await removeToken();

            set({
                token: null,
                user: null,
                isLoading: false,
            });

            throw error;
        }
    },

    signup: async (name, email, password) => {
        set({ isLoading: true });

        try {
            await signupRequest(name, email, password);

            const data = await loginRequest(email, password);

            await saveToken(data.token);

            const user = await getCurrentUser();

            set({
                token: data.token,
                user,
                isLoading: false,
            });
        } catch (error) {
            await removeToken();

            set({
                token: null,
                user: null,
                isLoading: false,
            });

            throw error;
        }
    },

    initialize: async () => {
        try {
            const token = await getToken();

            if (!token) {
                set({ isInitialized: true });

                return;
            }

            // an existing token in SecureStore does not mean session is valid
            // the backed verifies the jwt here
            const user = await getCurrentUser();

            set({
                token,
                user,
                isInitialized: true,
            });
        } catch (error) {

            // treat user as logged out of token missing/expired/invalid
            await removeToken();

            set({
                token: null,
                user: null,
                isInitialized: true,
            });
        }
    },

    logout: async () => {
        await removeToken();

        set({
            token: null,
            user: null,
        });
    },

    handleUnauthorized: async () => {
        await removeToken();

        set({
            token: null,
            user: null,
        });
    },
}));

setUnauthorizedHandler(() => {
    void useAuthStore.getState().handleUnauthorized();
});