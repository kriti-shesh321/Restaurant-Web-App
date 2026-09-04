import {
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";

import {
    Redirect,
    Stack,
    useLocalSearchParams,
} from "expo-router";

import { useAuthStore } from "../../src/stores/authStore";
import { useOrder } from "../../src/hooks/useOrders";

import type {
    OrderStatus,
    OrderType,
} from "../../src/types/order";

const DELIVERY_STEPS: OrderStatus[] = [
    "Confirmed",
    "Preparing Order",
    "Out for Delivery",
    "Delivered",
];

const DINE_IN_STEPS: OrderStatus[] = [
    "Confirmed",
    "Preparing Order",
    "Ready",
    "Served",
];

const STATUS_LABELS: Record<string, string> = {
    Pending: "Order received",
    Confirmed: "Confirmed",
    "Preparing Order": "Preparing",
    Ready: "Ready",
    "Out for Delivery": "Out for delivery",
    Served: "Served",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
};

function getSteps(orderType: OrderType) {
    return orderType === "delivery"
        ? DELIVERY_STEPS
        : DINE_IN_STEPS;
}

function getCurrentStepIndex(
    status: OrderStatus,
    steps: OrderStatus[]
) {
    if (status === "Cancelled") {
        return -1;
    }

    return steps.indexOf(status);
}

export default function OrderDetailScreen() {
    const token = useAuthStore(
        (state) => state.token
    );

    const { id } =
        useLocalSearchParams<{ id: string }>();

    const orderId = Number(id);

    const {
        data: order,
        isLoading,
        isError,
        refetch,
        isRefetching,
    } = useOrder(orderId);

    if (!token) {
        return <Redirect href="/login" />;
    }

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-base text-gray-500">
                    Loading order...
                </Text>
            </View>
        );
    }

    if (isError || !order) {
        return (
            <View className="flex-1 items-center justify-center bg-white px-6">
                <Text className="mb-4 text-center text-base text-red-600">
                    Unable to load this order.
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

    const steps = getSteps(order.orderType);

    const currentStepIndex =
        getCurrentStepIndex(
            order.status,
            steps
        );

    const isActive =
        order.status !== "Delivered" &&
        order.status !== "Served" &&
        order.status !== "Cancelled";

    return (
        <>
            <Stack.Screen
                options={{
                    title: `Order #${order.id}`,
                }}
            />

            <ScrollView
                className="flex-1 bg-gray-50"
                contentContainerClassName="px-5 pb-10 pt-5"
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={() => refetch()}
                    />
                }
            >
                <View className="rounded-2xl bg-white p-5">
                    <View className="flex-row items-start justify-between">
                        <View>
                            <Text className="text-2xl font-bold text-gray-900">
                                Order #{order.id}
                            </Text>

                            <Text className="mt-1 text-gray-500">
                                {order.orderType === "delivery"
                                    ? "Delivery"
                                    : "Dine-in"}
                            </Text>
                        </View>

                        <View className="rounded-full bg-gray-100 px-3 py-2">
                            <Text className="text-xs font-semibold text-gray-700">
                                {order.status}
                            </Text>
                        </View>
                    </View>

                    {isActive && (
                        <Text className="mt-4 text-sm text-gray-500">
                            Status updates automatically every 5 seconds.
                        </Text>
                    )}
                </View>

                <TrackingTimeline
                    status={order.status}
                    steps={steps}
                    currentStepIndex={currentStepIndex}
                />

                <View className="mt-4 rounded-2xl bg-white p-5">
                    <Text className="text-xl font-bold text-gray-900">
                        Order Items
                    </Text>

                    <View className="mt-4">
                        {order.items.map((item) => (
                            <View
                                key={item.menuItemId}
                                className="mb-4 flex-row justify-between"
                            >
                                <View className="flex-1 pr-4">
                                    <Text className="font-semibold text-gray-800">
                                        {item.menuItem.name}
                                    </Text>

                                    <Text className="mt-1 text-sm text-gray-500">
                                        {item.quantity} × $
                                        {Number(
                                            item.price
                                        ).toFixed(2)}
                                    </Text>
                                </View>

                                <Text className="font-semibold text-gray-900">
                                    $
                                    {(
                                        Number(item.price) *
                                        item.quantity
                                    ).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View className="mt-2 border-t border-gray-100 pt-4">
                        <View className="flex-row justify-between">
                            <Text className="text-lg font-bold text-gray-900">
                                Total
                            </Text>

                            <Text className="text-lg font-bold text-red-800">
                                $
                                {Number(
                                    order.totalAmount
                                ).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="mt-4 rounded-2xl bg-white p-5">
                    <Text className="text-xl font-bold text-gray-900">
                        {order.orderType === "delivery"
                            ? "Delivery Address"
                            : "Table"}
                    </Text>

                    {order.orderType === "delivery" &&
                        order.deliveryAddress ? (
                        <View className="mt-3">
                            <Text className="font-semibold text-gray-800">
                                {order.deliveryAddress.type}
                            </Text>

                            <Text className="mt-1 text-gray-600">
                                {order.deliveryAddress.address}
                            </Text>

                            <Text className="text-gray-600">
                                {order.deliveryAddress.city},{" "}
                                {order.deliveryAddress.state}{" "}
                                {order.deliveryAddress.zipCode}
                            </Text>
                        </View>
                    ) : order.orderType === "dine-in" ? (
                        <Text className="mt-3 text-base text-gray-700">
                            Table {order.tableNumber}
                        </Text>
                    ) : (
                        <Text className="mt-3 text-gray-500">
                            No delivery address available.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </>
    );
}

interface TrackingTimelineProps {
    status: OrderStatus;
    steps: OrderStatus[];
    currentStepIndex: number;
}

function TrackingTimeline({
    status,
    steps,
    currentStepIndex,
}: TrackingTimelineProps) {
    if (status === "Cancelled") {
        return (
            <View className="mt-4 rounded-2xl bg-white p-5">
                <Text className="text-xl font-bold text-red-700">
                    Order Cancelled
                </Text>

                <Text className="mt-2 text-gray-500">
                    This order will not proceed further.
                </Text>
            </View>
        );
    }

    return (
        <View className="mt-4 rounded-2xl bg-white p-5">
            <Text className="text-xl font-bold text-gray-900">
                Order Tracking
            </Text>

            <View className="mt-5">
                {steps.map((step, index) => {
                    const completed =
                        index < currentStepIndex;

                    const current =
                        index === currentStepIndex;

                    const isLast =
                        index === steps.length - 1;

                    return (
                        <View
                            key={step}
                            className="flex-row"
                        >
                            <View className="mr-4 items-center">
                                <View
                                    className={
                                        completed || current
                                            ? "h-8 w-8 items-center justify-center rounded-full bg-red-800"
                                            : "h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white"
                                    }
                                >
                                    <Text
                                        className={
                                            completed || current
                                                ? "text-sm font-bold text-white"
                                                : "text-sm text-gray-400"
                                        }
                                    >
                                        {completed
                                            ? "✓"
                                            : index + 1}
                                    </Text>
                                </View>

                                {!isLast && (
                                    <View
                                        className={
                                            index <
                                                currentStepIndex
                                                ? "my-1 h-8 w-0.5 bg-red-800"
                                                : "my-1 h-8 w-0.5 bg-gray-200"
                                        }
                                    />
                                )}
                            </View>

                            <View className="flex-1 pb-8">
                                <Text
                                    className={
                                        completed || current
                                            ? "font-bold text-gray-900"
                                            : "text-gray-400"
                                    }
                                >
                                    {STATUS_LABELS[step]}
                                </Text>

                                {current && (
                                    <Text className="mt-1 text-sm text-gray-500">
                                        Current status
                                    </Text>
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}