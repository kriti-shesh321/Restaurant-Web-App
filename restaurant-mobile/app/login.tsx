import {
    View,
    Text,
    TextInput,
    Pressable,
} from "react-native";
import { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { useAuthStore } from "../src/stores/authStore";

export default function LoginScreen() {
    const router = useRouter();

    const token = useAuthStore((state) => state.token);
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore(
        (state) => state.isLoading
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (token) {
        return <Redirect href="/" />;
    }

    async function handleLogin() {
        setError("");

        try {
            await login(email, password);
            router.replace("/");
        } catch (error: any) {
            setError(
                error?.response?.data?.message ||
                "Login failed."
            );
        }
    }

    return (
        <View className="flex-1 justify-center gap-3 px-6">
            <Text className="mb-2 text-3xl font-bold">
                Login
            </Text>

            <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3.5 text-base"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3.5 text-base"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error ? (
                <Text className="text-red-600">
                    {error}
                </Text>
            ) : null}

            <Pressable
                className="items-center rounded-lg bg-green-800 py-3.5"
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text className="font-semibold text-white">
                    {isLoading
                        ? "Logging in..."
                        : "Login"}
                </Text>
            </Pressable>

            <Pressable
                className="items-center py-2"
                onPress={() => router.push("/signup")}
            >
                <Text className="text-gray-700">
                    Don't have an account?{" "}
                    <Text className="font-semibold text-green-800">
                        Sign up
                    </Text>
                </Text>
            </Pressable>
        </View>
    );
}