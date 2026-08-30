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
        <View
            style={{
                flex: 1,
                padding: 24,
                justifyContent: "center",
                gap: 12,
            }}
        >
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                Login
            </Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error ? (
                <Text style={{ color: "red" }}>{error}</Text>
            ) : null}

            <Pressable
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text>
                    {isLoading ? "Logging in..." : "Login"}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.push("/signup")}>
                <Text>Don't have an account? Sign up</Text>
            </Pressable>
        </View>
    );
}