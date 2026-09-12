import "../global.css";

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useEffect } from "react";
import { useAuthStore } from "../src/stores/authStore";

import { StripeProvider } from "@stripe/stripe-react-native";

const queryClient = new QueryClient();

const stripePublishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

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
        <SafeAreaProvider>

            <StripeProvider publishableKey={stripePublishableKey ?? ""}>

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
                            name="cart"
                            options={{ title: "Your Cart" }}
                        />

                        <Stack.Screen
                            name="checkout"
                            options={{ title: "Checkout" }}
                        />

                        <Stack.Screen
                            name="order-success"
                            options={{
                                title: "Order Confirmed",
                                headerBackVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name="orders/index"
                            options={{ title: "Your Orders" }}
                        />

                        <Stack.Screen
                            name="orders/[id]"
                            options={{ title: "Order Details" }}
                        />

                    </Stack>
                </QueryClientProvider>

            </StripeProvider>

        </SafeAreaProvider>
    );
}