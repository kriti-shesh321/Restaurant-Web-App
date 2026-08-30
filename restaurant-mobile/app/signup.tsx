import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
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
        <View style={styles.container}>
            <Text style={styles.title}>
                Create Account
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error ? (
                <Text style={styles.error}>
                    {error}
                </Text>
            ) : null}

            <Pressable
                style={styles.button}
                onPress={handleSignup}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading
                        ? "Creating account..."
                        : "Sign Up"}
                </Text>
            </Pressable>

            <Pressable
                onPress={() => router.replace("/login")}
            >
                <Text style={styles.link}>
                    Already have an account? Login
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        gap: 14,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#9d1d1f",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    link: {
        textAlign: "center",
        marginTop: 8,
    },

    error: {
        color: "red",
    },
});