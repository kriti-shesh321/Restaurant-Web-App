import {
    View,
    Text,
    Pressable,
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
        <View className="flex-1 items-center justify-center gap-3 px-6">
            <Text className="text-3xl font-bold">
                Restaurant Mobile
            </Text>

            <Text className="text-base">
                Welcome, {user?.name}
            </Text>

            <Text className="text-gray-600">
                {user?.email}
            </Text>

            <Pressable
                className="mt-5 rounded-lg bg-red-800 px-6 py-3.5"
                onPress={handleLogout}
            >
                <Text className="font-semibold text-white">
                    Logout
                </Text>
            </Pressable>
        </View>
    );
}