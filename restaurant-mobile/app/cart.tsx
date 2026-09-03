import {
    FlatList,
    Image,
    Pressable,
    Text,
    View,
} from "react-native";

import { useMemo } from "react";
import { useRouter } from "expo-router";

import { useCartStore } from "../src/stores/cartStore";

const dishImages = [
    require("../assets/dishes/misoSoup.jpg"),
    require("../assets/dishes/beefPho.jpg"),
    require("../assets/dishes/padThai.jpg"),
    require("../assets/dishes/grilledSalmonTeriyaki.jpg"),
    require("../assets/dishes/lemongrassTea.jpg"),
];

const getDishImage = (dishId: number) => {
    return dishImages[dishId % dishImages.length];
};

export default function CartScreen() {
    const router = useRouter();

    const items = useCartStore(
        (state) => state.items
    );

    const updateQuantity = useCartStore(
        (state) => state.updateQuantity
    );

    const removeItem = useCartStore(
        (state) => state.removeItem
    );

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, item) =>
                    sum +
                    Number(item.menuItem.price) *
                    item.quantity,
                0
            ),
        [items]
    );

    if (items.length === 0) {
        return (
            <View className="flex-1 items-center justify-center px-6">
                <Text className="text-2xl font-bold text-gray-900">
                    Your cart is empty
                </Text>

                <Text className="mt-2 text-center text-gray-500">
                    Add some delicious items from the menu.
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
        );
    }

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={items}
                keyExtractor={(item) =>
                    String(item.menuItem.id)
                }
                contentContainerClassName="gap-4 px-5 pb-32 pt-5"
                renderItem={({ item }) => (
                    <View className="flex-row rounded-xl border border-gray-100 bg-white p-3">
                        <Image
                            source={getDishImage(item.menuItem.id)}
                            className="h-24 w-24 rounded-lg"
                            resizeMode="cover"
                        />

                        <View className="ml-3 flex-1">
                            <Text className="font-bold text-gray-900">
                                {item.menuItem.name}
                            </Text>

                            <Text className="mt-1 font-semibold text-red-800">
                                ${Number(item.menuItem.price).toFixed(2)}
                            </Text>

                            <View className="mt-3 flex-row items-center">
                                <Pressable
                                    className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                                    onPress={() =>
                                        updateQuantity(
                                            item.menuItem.id,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    <Text className="text-lg">
                                        −
                                    </Text>
                                </Pressable>

                                <Text className="mx-4 font-semibold">
                                    {item.quantity}
                                </Text>

                                <Pressable
                                    className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                                    onPress={() =>
                                        updateQuantity(
                                            item.menuItem.id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    <Text className="text-lg">
                                        +
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="ml-auto"
                                    onPress={() =>
                                        removeItem(
                                            item.menuItem.id
                                        )
                                    }
                                >
                                    <Text className="text-sm text-red-600">
                                        Remove
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View className="border-t border-gray-200 bg-white px-5 pb-8 pt-4">
                <View className="flex-row justify-between">
                    <Text className="text-lg text-gray-600">
                        Subtotal
                    </Text>

                    <Text className="text-xl font-bold text-gray-900">
                        ${subtotal.toFixed(2)}
                    </Text>
                </View>

                <Pressable
                    className="mt-4 items-center rounded-xl bg-red-800 py-4"
                    onPress={() => router.push("/checkout")}
                >
                    <Text className="text-base font-bold text-white">
                        Proceed to Checkout
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}