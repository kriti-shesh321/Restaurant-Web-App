import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { useState, } from "react";
import { useRouter } from "expo-router";

import { useCartStore } from "../src/stores/cartStore";

import { useDeliveryAddresses, useAddDeliveryAddress } from "../src/hooks/useAddresses";
import { useCreateOrder } from "../src/hooks/useOrders";

import type { OrderType } from "../src/types/order";

export default function CheckoutScreen() {
    const router = useRouter();

    const items = useCartStore(
        (state) => state.items
    );

    const clearCart = useCartStore(
        (state) => state.clearCart
    );

    const [orderType, setOrderType] = useState<OrderType>("delivery");

    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

    const [tableNumber, setTableNumber] = useState("");

    const [isAddingAddress, setIsAddingAddress] =
        useState(false);

    const [addressType, setAddressType] =
        useState<"Home" | "Work" | "Other">("Home");

    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");

    const {
        data: addresses = [],
        isLoading: addressesLoading,
    } = useDeliveryAddresses();

    const addAddressMutation = useAddDeliveryAddress();

    const createOrderMutation = useCreateOrder();

    async function handleAddAddress() {
        if (
            !address.trim() ||
            !contact.trim() ||
            !city.trim() ||
            !state.trim() ||
            !country.trim() ||
            !zipCode.trim()
        ) {
            return;
        }

        try {
            const newAddress =
                await addAddressMutation.mutateAsync({
                    type: addressType,
                    address: address.trim(),
                    contact: contact.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    country: country.trim(),
                    zipCode: zipCode.trim(),
                });

            setSelectedAddressId(newAddress.id);

            setAddress("");
            setContact("");
            setCity("");
            setState("");
            setCountry("");
            setZipCode("");

            setIsAddingAddress(false);
        } catch (error) {
            console.error(
                "Failed to add address:",
                error
            );
        }
    }

    async function handlePlaceOrder() {
        if (items.length === 0) {
            return;
        }

        if (orderType === "delivery" && !selectedAddressId) {
            return;
        }

        if (orderType === "dine-in" && !tableNumber.trim()) {
            return;
        }

        const payload = {
            orderType,

            ...(orderType === "delivery"
                ? { deliveryAddressId: selectedAddressId!, }
                : { tableNumber: tableNumber.trim(), }
            ),

            items: items.map((item) => ({
                menuItemId: item.menuItem.id,
                quantity: item.quantity,
            })),
        };

        try {
            await createOrderMutation.mutateAsync(payload);

            clearCart();

            router.replace("/order-success");
        } catch (error) {
            console.error("Failed to place order:", error);
        }
    }

    return (
        <ScrollView
            className="flex-1 bg-white"
            contentContainerClassName="px-5 pb-10 pt-5"
        >
            <Text className="text-2xl font-bold text-gray-900">
                Checkout
            </Text>

            <Text className="mt-6 text-lg font-bold">
                Order type
            </Text>

            <View className="mt-3 flex-row gap-3">
                <Pressable
                    className={
                        orderType === "delivery"
                            ? "flex-1 rounded-xl bg-red-800 p-4"
                            : "flex-1 rounded-xl bg-gray-100 p-4"
                    }
                    onPress={() =>
                        setOrderType("delivery")
                    }
                >
                    <Text
                        className={
                            orderType === "delivery"
                                ? "text-center font-semibold text-white"
                                : "text-center font-semibold text-gray-700"
                        }
                    >
                        Delivery
                    </Text>
                </Pressable>

                <Pressable
                    className={
                        orderType === "dine-in"
                            ? "flex-1 rounded-xl bg-red-800 p-4"
                            : "flex-1 rounded-xl bg-gray-100 p-4"
                    }
                    onPress={() =>
                        setOrderType("dine-in")
                    }
                >
                    <Text
                        className={
                            orderType === "dine-in"
                                ? "text-center font-semibold text-white"
                                : "text-center font-semibold text-gray-700"
                        }
                    >
                        Dine-in
                    </Text>
                </Pressable>
            </View>

            {orderType === "delivery" && (
                <View className="mt-6">
                    <Text className="text-lg font-bold">
                        Delivery address
                    </Text>

                    {addressesLoading ? (
                        <Text className="mt-3 text-gray-500">
                            Loading addresses...
                        </Text>
                    ) : addresses.length === 0 ? (
                        <Text className="mt-3 text-gray-500">
                            No saved addresses.
                        </Text>
                    ) : (
                        <View className="mt-3 gap-3">
                            {addresses.map(
                                (address: any) => (
                                    <Pressable
                                        key={address.id}
                                        className={
                                            selectedAddressId ===
                                                address.id
                                                ? "rounded-xl border-2 border-red-800 bg-red-50 p-4"
                                                : "rounded-xl border border-gray-200 p-4"
                                        }
                                        onPress={() =>
                                            setSelectedAddressId(
                                                address.id
                                            )
                                        }
                                    >
                                        <Text className="font-semibold text-gray-900">
                                            {address.type}
                                        </Text>

                                        <Text className="mt-1 text-gray-600">
                                            {address.address}
                                        </Text>

                                        <Text className="text-gray-600">
                                            {address.city},{" "}
                                            {address.state}{" "}
                                            {address.zipCode}
                                        </Text>
                                    </Pressable>
                                )
                            )}
                        </View>
                    )}

                    {/* Address creation form */}

                    <Pressable
                        className="mt-4 items-center rounded-xl border border-red-800 py-3"
                        onPress={() =>
                            setIsAddingAddress(!isAddingAddress)
                        }
                    >
                        <Text className="font-semibold text-red-800">
                            {isAddingAddress
                                ? "Cancel"
                                : "+ Add New Address"}
                        </Text>
                    </Pressable>

                    {isAddingAddress && (
                        <View className="mt-4 gap-3">
                            <Text className="text-base font-bold text-gray-900">
                                New address
                            </Text>

                            <View className="flex-row gap-2">
                                {(["Home", "Work", "Other"] as const).map(
                                    (type) => (
                                        <Pressable
                                            key={type}
                                            className={
                                                addressType === type
                                                    ? "flex-1 rounded-lg bg-red-800 py-3"
                                                    : "flex-1 rounded-lg bg-gray-100 py-3"
                                            }
                                            onPress={() =>
                                                setAddressType(type)
                                            }
                                        >
                                            <Text
                                                className={
                                                    addressType === type
                                                        ? "text-center font-semibold text-white"
                                                        : "text-center font-semibold text-gray-700"
                                                }
                                            >
                                                {type}
                                            </Text>
                                        </Pressable>
                                    )
                                )}
                            </View>

                            <TextInput
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                placeholder="Address"
                                value={address}
                                onChangeText={setAddress}
                            />

                            <TextInput
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                placeholder="Contact number"
                                value={contact}
                                onChangeText={setContact}
                                keyboardType="phone-pad"
                            />

                            <TextInput
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                placeholder="City"
                                value={city}
                                onChangeText={setCity}
                            />

                            <TextInput
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                placeholder="State"
                                value={state}
                                onChangeText={setState}
                            />

                            <TextInput
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                placeholder="Country"
                                value={country}
                                onChangeText={setCountry}
                            />

                            <TextInput
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                placeholder="ZIP / Postal code"
                                value={zipCode}
                                onChangeText={setZipCode}
                                keyboardType="number-pad"
                            />

                            <Pressable
                                className="items-center rounded-xl bg-red-800 py-4"
                                onPress={handleAddAddress}
                                disabled={addAddressMutation.isPending}
                            >
                                <Text className="font-bold text-white">
                                    {addAddressMutation.isPending
                                        ? "Saving..."
                                        : "Save Address"}
                                </Text>
                            </Pressable>

                            {addAddressMutation.isError && (
                                <Text className="text-center text-red-600">
                                    Unable to save address. Please try again.
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            )}

            {orderType === "dine-in" && (
                <View className="mt-6">
                    <Text className="text-lg font-bold">
                        Table number
                    </Text>

                    <TextInput
                        className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                        placeholder="Enter table number"
                        value={tableNumber}
                        onChangeText={setTableNumber}
                    />
                </View>
            )}

            <Text className="mt-8 text-lg font-bold">
                Order summary
            </Text>

            <View className="mt-3">
                {items.map((item) => (
                    <View
                        key={item.menuItem.id}
                        className="mb-3 flex-row justify-between"
                    >
                        <Text className="flex-1 text-gray-700">
                            {item.menuItem.name} ×{" "}
                            {item.quantity}
                        </Text>

                        <Text className="font-semibold">
                            $
                            {(
                                Number(
                                    item.menuItem.price
                                ) *
                                item.quantity
                            ).toFixed(2)}
                        </Text>
                    </View>
                ))}
            </View>

            <Pressable
                className="mt-8 items-center rounded-xl bg-red-800 py-4"
                onPress={handlePlaceOrder}
                disabled={
                    createOrderMutation.isPending
                }
            >
                <Text className="font-bold text-white">
                    {createOrderMutation.isPending
                        ? "Placing Order..."
                        : "Place Order"}
                </Text>
            </Pressable>

            {createOrderMutation.isError && (
                <Text className="mt-3 text-center text-red-600">
                    Unable to place order. Please try
                    again.
                </Text>
            )}
        </ScrollView>
    );
}