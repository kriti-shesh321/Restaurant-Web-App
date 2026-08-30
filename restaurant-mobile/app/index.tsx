import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

import { Redirect } from "expo-router";

import { useAuthStore } from "../src/stores/authStore";

export default function HomeScreen() {
    const token = useAuthStore(
        (state) => state.token
    );

    const user = useAuthStore(
        (state) => state.user
    );

    const logout = useAuthStore(
        (state) => state.logout
    );

    if (!token) {
        return <Redirect href="/login" />;
    }

    async function handleLogout() {
        await logout();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Restaurant Mobile
            </Text>

            <Text>
                Welcome, {user?.name}
            </Text>

            <Text>
                {user?.email}
            </Text>

            <Pressable
                style={styles.button}
                onPress={handleLogout}
            >
                <Text style={styles.buttonText}>
                    Logout
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
        alignItems: "center",
        gap: 12,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
    },

    button: {
        backgroundColor: "#9d1d1f",
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,
    },

    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});