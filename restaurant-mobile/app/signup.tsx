import {
    View,
    Text,
    TextInput,
    Pressable,
} from "react-native";

import { useState } from "react";

import {
    Redirect,
    useRouter,
} from "expo-router";

import { useAuthStore } from "../src/stores/authStore";

export default function SignupScreen() {
    const router = useRouter();

    const token = useAuthStore(
        (state) => state.token
    );

    const signup = useAuthStore(
        (state) => state.signup
    );

    const isLoading = useAuthStore(
        (state) => state.isLoading
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    if (token) {
        return <Redirect href="/" />;
    }

    async function handleSignup() {
        setError("");

        try {
            await signup(name, email, password);

            router.replace("/");
        } catch (error: any) {
            setError(
                error?.response?.data?.message ||
                "Signup failed."
            );
        }
    }

    return (
        <View className="flex-1 justify-center gap-3.5 px-6">
            <Text className="mb-2 text-3xl font-bold">
                Create Account
            </Text>

            <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3.5 text-base"
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

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
                onPress={handleSignup}
                disabled={isLoading}
            >
                <Text className="font-semibold text-white">
                    {isLoading
                        ? "Creating account..."
                        : "Sign Up"}
                </Text>
            </Pressable>

            <Pressable
                className="items-center py-2"
                onPress={() => router.replace("/login")}
            >
                <Text className="text-gray-700">
                    Already have an account?{" "}
                    <Text className="font-semibold text-green-800">
                        Login
                    </Text>
                </Text>
            </Pressable>
        </View>
    );
}