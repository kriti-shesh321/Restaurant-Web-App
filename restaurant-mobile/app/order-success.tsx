import {
    Pressable,
    Text,
    View,
} from "react-native";

import { useRouter } from "expo-router";

export default function OrderSuccessScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 items-center justify-center px-6">
            <Text className="text-3xl font-bold text-gray-900">
                Order Placed!
            </Text>

            <Text className="mt-3 text-center text-gray-500">
                Your order has been received and is being
                processed.
            </Text>

            <Pressable
                className="mt-8 rounded-xl bg-red-800 px-8 py-4"
                onPress={() => router.replace("/")}
            >
                <Text className="font-bold text-white">
                    Back to Menu
                </Text>
            </Pressable>
        </View>
    );
}