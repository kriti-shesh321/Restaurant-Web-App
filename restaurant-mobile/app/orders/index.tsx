import {
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";

import { Redirect, useRouter } from "expo-router";

import { useAuthStore } from "../../src/stores/authStore";
import { useOrders } from "../../src/hooks/useOrders";

import type { OrderHistoryItem } from "../../src/types/order";

function formatOrderDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(
        undefined,
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
}

export default function OrdersScreen() {
    const router = useRouter();

    const token = useAuthStore(
        (state) => state.token
    );

    const {
        data: orders = [],
        isLoading,
        isError,
        refetch,
        isRefetching,
    } = useOrders();

    if (!token) {
        return <Redirect href="/login" />;
    }

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-base text-gray-500">
                    Loading orders...
                </Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 items-center justify-center bg-white px-6">
                <Text className="mb-4 text-center text-base text-red-600">
                    Unable to load your orders.
                </Text>

                <Pressable
                    className="rounded-xl bg-red-800 px-6 py-3"
                    onPress={() => refetch()}
                >
                    <Text className="font-semibold text-white">
                        Try Again
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={orders}
                keyExtractor={(item) => String(item.id)}
                contentContainerClassName="gap-4 px-5 pb-8 pt-5"
                refreshing={isRefetching}
                onRefresh={refetch}
                ListHeaderComponent={
                    <Text className="mb-2 text-3xl font-bold text-gray-900">
                        Your Orders
                    </Text>
                }
                ListEmptyComponent={
                    <View className="items-center py-16">
                        <Text className="text-lg font-semibold text-gray-700">
                            No orders yet
                        </Text>

                        <Text className="mt-2 text-center text-gray-500">
                            Your completed orders will appear here.
                        </Text>

                        <Pressable
                            className="mt-6 rounded-xl bg-red-800 px-6 py-3"
                            onPress={() => router.replace("/")}
                        >
                            <Text className="font-semibold text-white">
                                Browse Menu
                            </Text>
                        </Pressable>
                    </View>
                }
                renderItem={({ item }) => (
                    <OrderCard
                        order={item}
                        onPress={() =>
                            router.push(
                                `/orders/${item.id}`
                            )
                        }
                    />
                )}
            />
        </View>
    );
}

interface OrderCardProps {
    order: OrderHistoryItem;
    onPress: () => void;
}

function OrderCard({
    order,
    onPress,
}: OrderCardProps) {
    return (
        <Pressable
            className="rounded-2xl border border-gray-100 bg-white p-4"
            onPress={onPress}
        >
            <View className="flex-row items-start justify-between">
                <View>
                    <Text className="text-lg font-bold text-gray-900">
                        Order #{order.id}
                    </Text>

                    <Text className="mt-1 text-sm text-gray-500">
                        {formatOrderDate(order.createdAt)}
                    </Text>
                </View>

                <OrderStatusBadge
                    status={order.status}
                />
            </View>

            <View className="mt-4 flex-row justify-between">
                <View>
                    <Text className="text-xs uppercase text-gray-400">
                        Type
                    </Text>

                    <Text className="mt-1 font-medium text-gray-700">
                        {order.orderType === "dine-in"
                            ? "Dine-in"
                            : "Delivery"}
                    </Text>
                </View>

                <View className="items-end">
                    <Text className="text-xs uppercase text-gray-400">
                        Items
                    </Text>

                    <Text className="mt-1 font-medium text-gray-700">
                        {order.itemCount}
                    </Text>
                </View>

                <View className="items-end">
                    <Text className="text-xs uppercase text-gray-400">
                        Total
                    </Text>

                    <Text className="mt-1 text-base font-bold text-red-800">
                        ${Number(order.totalAmount).toFixed(2)}
                    </Text>
                </View>
            </View>

            <Text className="mt-4 text-center text-sm font-semibold text-red-800">
                View Order →
            </Text>
        </Pressable>
    );
}

function OrderStatusBadge({
    status,
}: {
    status: string;
}) {
    return (
        <View className="rounded-full bg-gray-100 px-3 py-1.5">
            <Text className="text-xs font-semibold text-gray-700">
                {status}
            </Text>
        </View>
    );
}