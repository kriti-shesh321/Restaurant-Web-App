import {
    Pressable,
    Text,
    View,
} from "react-native";

import {
    useLocalSearchParams,
    useRouter,
} from "expo-router";

export default function OrderSuccessScreen() {
    const router = useRouter();

    const { orderId } = useLocalSearchParams<{ orderId: string; }>();

    return (
        <View className="flex-1 items-center justify-center bg-white px-6">
            <Text className="text-3xl font-bold text-gray-900">
                Order Placed!
            </Text>

            <Text className="mt-3 text-center text-gray-500">
                Your order has been received and is being processed.
            </Text>

            {orderId && (
                <Text className="mt-4 text-lg font-semibold text-gray-800">
                    Order #{orderId}
                </Text>
            )}

            <Pressable
                className="mt-8 w-full items-center rounded-xl bg-red-800 py-4"
                onPress={() =>
                    router.replace({
                        pathname: "/orders/[id]",
                        params: {
                            id: orderId,
                        },
                    })
                }
            >
                <Text className="font-bold text-white">
                    Track Order
                </Text>
            </Pressable>

            <Pressable
                className="mt-3 w-full items-center rounded-xl bg-gray-100 py-4"
                onPress={() => router.replace("/")}
            >
                <Text className="font-semibold text-gray-700">
                    Back to Menu
                </Text>
            </Pressable>
        </View>
    );
}