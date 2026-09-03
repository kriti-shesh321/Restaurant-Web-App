import {
    FlatList,
    Image,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import { useMemo, useState } from "react";
import { Redirect, useRouter } from "expo-router";

import { useAuthStore } from "../src/stores/authStore";
import { useCartStore } from "../src/stores/cartStore";

import {
    useOnlineMenu,
    useMenuCategories,
} from "../src/hooks/useMenu";

import type { MenuItem } from "../src/types/menu";

const dishImages = [
    require("../assets/dishes/misoSoup.jpg"),
    require("../assets/dishes/beefPho.jpg"),
    require("../assets/dishes/padThai.jpg"),
    require("../assets/dishes/grilledSalmonTeriyaki.jpg"),
    require("../assets/dishes/lemongrassTea.jpg"),
];

const getDishImage = (dishId: number) => {
    const index = dishId % dishImages.length;
    return dishImages[index];
};

export default function HomeScreen() {
    const router = useRouter();

    const token = useAuthStore(
        (state) => state.token
    );

    const user = useAuthStore(
        (state) => state.user
    );

    const logout = useAuthStore(
        (state) => state.logout
    );

    const addItem = useCartStore(
        (state) => state.addItem
    );

    const {
        data: menu = [],
        isLoading: menuLoading,
        isError: menuError,
        refetch: refetchMenu,
        isRefetching,
    } = useOnlineMenu();

    const { data: categories = [], isLoading: categoriesLoading, } = useMenuCategories();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const filteredMenu = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return menu.filter((item) => {
            const matchesSearch =
                normalizedSearch.length === 0 ||
                item.name
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                item.description
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesCategory =
                selectedCategory === null ||
                item.category.id === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [menu, search, selectedCategory]);

    const cartItemCount = useCartStore(
        (state) =>
            state.items.reduce(
                (total, item) => total + item.quantity,
                0
            )
    );

    async function handleLogout() {
        await logout();
    }

    if (!token) {
        return <Redirect href="/login" />;
    }

    if (menuLoading || categoriesLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-base text-gray-600">
                    Loading menu...
                </Text>
            </View>
        );
    }

    if (menuError) {
        return (
            <View className="flex-1 items-center justify-center px-6">
                <Text className="mb-4 text-center text-base text-red-600">
                    Unable to load the menu.
                </Text>

                <Pressable
                    className="rounded-lg bg-red-800 px-6 py-3"
                    onPress={() => refetchMenu()}
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
            <View className="px-5 pb-3 pt-14">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-3xl font-bold text-gray-900">
                            Our Menu
                        </Text>

                        <Text className="mt-1 text-gray-500">
                            Fresh food, ready to order
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <Pressable
                            className="rounded-lg bg-red-800 px-4 py-2"
                            onPress={() => router.push("/cart")}
                        >
                            <Text className="font-semibold text-white">
                                Cart ({cartItemCount})
                            </Text>
                        </Pressable>

                        <Pressable
                            className="rounded-lg bg-gray-100 px-3 py-2"
                            onPress={handleLogout}
                        >
                            <Text className="font-semibold text-gray-700">
                                Logout
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <TextInput
                    className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base"
                    placeholder="Search dishes..."
                    value={search}
                    onChangeText={setSearch}
                    autoCapitalize="none"
                />
            </View>

            <View className="mb-3">
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={(item) => String(item.id)}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="gap-2 px-5"
                    renderItem={({ item }) => {
                        const selected =
                            selectedCategory === item.id;

                        return (
                            <Pressable
                                className={
                                    selected
                                        ? "rounded-full bg-red-800 px-4 py-2"
                                        : "rounded-full bg-gray-100 px-4 py-2"
                                }
                                onPress={() => setSelectedCategory(selected ? null : item.id)}
                            >
                                <Text
                                    className={
                                        selected
                                            ? "font-semibold text-white"
                                            : "text-gray-700"
                                    }
                                >
                                    {item.name}
                                </Text>
                            </Pressable>
                        );
                    }}
                />
            </View>

            <FlatList
                data={filteredMenu}
                keyExtractor={(item) => String(item.id)}
                contentContainerClassName="gap-4 px-5 pb-8"
                refreshing={isRefetching}
                onRefresh={refetchMenu}
                ListEmptyComponent={
                    <View className="items-center py-10">
                        <Text className="text-base text-gray-500">
                            No dishes found.
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <MenuCard
                        item={item}
                        image={getDishImage(item.id)}
                        onAddToCart={() => addItem(item)}
                    />
                )}
            />
        </View>
    );
}

interface MenuCardProps {
    item: MenuItem;
    image: any;
    onAddToCart: () => void;
}

function MenuCard({
    item,
    image,
    onAddToCart,
}: MenuCardProps) {
    return (
        <View>
            <Image
                source={image}
                className="h-48 w-full"
                resizeMode="cover"
            />

            <View className="p-4">
                <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-gray-900">
                            {item.name}
                        </Text>

                        <Text
                            className="mt-1 text-sm text-gray-500"
                            numberOfLines={2}
                        >
                            {item.description}
                        </Text>
                    </View>

                    <Text className="text-base font-bold text-red-800">
                        ${Number(item.price).toFixed(2)}
                    </Text>
                </View>

                <Text className="mt-2 text-xs text-gray-400">
                    {item.category.name}
                </Text>

                <Pressable
                    className="mt-4 items-center rounded-lg bg-red-800 py-3"
                    onPress={onAddToCart}
                >
                    <Text className="font-semibold text-white">
                        Add to Cart
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}