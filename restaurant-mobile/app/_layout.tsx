import "../global.css";

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../src/stores/authStore";

const queryClient = new QueryClient();

export default function RootLayout() {
    const initialize = useAuthStore(
        (state) => state.initialize
    );

    const isInitialized = useAuthStore(
        (state) => state.isInitialized
    );

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (!isInitialized) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="login"
                    options={{ title: "Login" }}
                />

                <Stack.Screen
                    name="signup"
                    options={{ title: "Sign Up" }}
                />

                <Stack.Screen
                    name="menu/[id]"
                    options={{ title: "Menu Item" }}
                />
            </Stack>
        </QueryClientProvider>
    );
}