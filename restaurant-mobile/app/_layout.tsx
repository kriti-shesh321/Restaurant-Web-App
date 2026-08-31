import "../global.css";

import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../src/stores/authStore";

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
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="login"
                options={{ title: "Login" }}
            />
        </Stack>
    );
}