import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import axios from "axios";

import { useState, } from "react";
import { useRouter } from "expo-router";

import { useCartStore } from "../src/stores/cartStore";

import { useDeliveryAddresses, useAddDeliveryAddress } from "../src/hooks/useAddresses";
import { useCreateOrder } from "../src/hooks/useOrders";

import type { OrderType } from "../src/types/order";

import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";

import { createPaymentIntent } from "../src/api/payments";

export default function CheckoutScreen() {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    const items = useCartStore(
        (state) => state.items
    );

    const clearCart = useCartStore(
        (state) => state.clearCart
    );

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

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

    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
    const [pendingPaymentOrderId, setPendingPaymentOrderId] = useState<number | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const {
        data: addresses = [],
        isLoading: addressesLoading,
    } = useDeliveryAddresses();

    const addAddressMutation = useAddDeliveryAddress();

    const createOrderMutation = useCreateOrder();

    async function handleAddAddress() {
        if (
            !address.trim() ||
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
                    city: city.trim(),
                    state: state.trim(),
                    country: country.trim(),
                    zipCode: zipCode.trim(),
                    ...(contact.trim() ? { contact: contact.trim() } : {}),
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

        setPaymentError(null);

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

            paymentMethod,
        };

        try {
            setIsProcessingPayment(true);

            let orderId = pendingPaymentOrderId;

            // Create the order only once for a card payment.
            // If the user cancels PaymentSheet and retries,
            // reuse the same pending order.
            if (!orderId) {
                const result = await createOrderMutation.mutateAsync(payload);

                orderId = result.order.id;

                setPendingPaymentOrderId(orderId);
            }

            if (paymentMethod === "card") {
                if (orderId === null) {
                    throw new Error("Order ID is missing");
                }

                const payment = await createPaymentIntent(orderId);

                const { error: initError } = await initPaymentSheet({
                    merchantDisplayName: "Restaurant",
                    paymentIntentClientSecret: payment.clientSecret
                });

                if (initError) {
                    setPaymentError(initError.message);
                    return;
                }

                const { error: paymentError } =
                    await presentPaymentSheet();

                if (paymentError) {
                    if (paymentError.code === PaymentSheetError.Canceled) {
                        return;
                    }

                    setPaymentError(paymentError.message);

                    return;
                }
            }

            // Only clear the cart after the payment
            // flow succeeds or cash order is created.
            clearCart();

            router.replace({
                pathname: "/order-success",
                params: {
                    orderId: String(orderId),
                    paymentMethod,
                },
            });

        } catch (error) {
            console.error(
                "Failed to place order:",
                error
            );

            setPaymentError(
                axios.isAxiosError(error)
                    ? error.response?.data?.message ??
                    "Unable to place order. Please try again."
                    : "Unable to place order. Please try again."
            );
        } finally {
            setIsProcessingPayment(false);
        }
    }

    return (
        <ScrollView
            className="flex-1 bg-white"
            contentContainerStyle={{
                paddingBottom: insets.bottom + 32,
            }}
            contentContainerClassName="px-5 pt-5"
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
                                placeholder="Contact number (Optional)"
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
                                    {axios.isAxiosError(addAddressMutation.error)
                                        ? addAddressMutation.error.response?.data?.message ??
                                        "Unable to save address. Please try again."
                                        : "Unable to save address. Please try again."}
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            )}

            {orderType === "dine-in" && (
                <View className="mt-6">
                    <Text className="text-lg font-bold">
                        Table
                    </Text>

                    <View className="mt-3 flex-row flex-wrap gap-3">
                        {Array.from(
                            { length: 10 },
                            (_, index) => String(index + 1)
                        ).map((table) => (
                            <Pressable
                                key={table}
                                className={
                                    tableNumber === table
                                        ? "w-[30%] rounded-xl bg-red-800 p-4"
                                        : "w-[30%] rounded-xl border border-gray-200 bg-gray-50 p-4"
                                }
                                onPress={() =>
                                    setTableNumber(table)
                                }
                            >
                                <Text
                                    className={
                                        tableNumber === table
                                            ? "text-center font-semibold text-white"
                                            : "text-center font-semibold text-gray-700"
                                    }
                                >
                                    Table {table}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
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

            <Text className="mt-8 text-lg font-bold">
                Payment method
            </Text>

            <View className="mt-3 gap-3">
                <Pressable
                    className={
                        paymentMethod === "cash"
                            ? "rounded-xl border-2 border-red-800 bg-red-50 p-4"
                            : "rounded-xl border border-gray-200 p-4"
                    }
                    onPress={() => {
                        setPaymentMethod("cash");
                        setPaymentError(null);
                    }}
                >
                    <Text
                        className={
                            paymentMethod === "cash"
                                ? "font-semibold text-red-800"
                                : "font-semibold text-gray-700"
                        }
                    >
                        Cash on delivery
                    </Text>

                    <Text className="mt-1 text-sm text-gray-500">
                        Pay when your order arrives.
                    </Text>
                </Pressable>

                <Pressable
                    className={
                        paymentMethod === "card"
                            ? "rounded-xl border-2 border-red-800 bg-red-50 p-4"
                            : "rounded-xl border border-gray-200 p-4"
                    }
                    onPress={() => {
                        setPaymentMethod("card");
                        setPaymentError(null);
                    }}
                >
                    <Text
                        className={
                            paymentMethod === "card"
                                ? "font-semibold text-red-800"
                                : "font-semibold text-gray-700"
                        }
                    >
                        Credit / debit card
                    </Text>

                    <Text className="mt-1 text-sm text-gray-500">
                        Secure payment powered by Stripe.
                    </Text>
                </Pressable>
            </View>

            <Pressable
                className="mt-8 items-center rounded-xl bg-red-800 py-4"
                onPress={handlePlaceOrder}
                disabled={
                    createOrderMutation.isPending ||
                    isProcessingPayment
                }
            >
                <Text className="font-bold text-white">
                    {isProcessingPayment
                        ? paymentMethod === "card"
                            ? "Processing..."
                            : "Placing Order..."
                        : paymentMethod === "card"
                            ? "Pay & Place Order"
                            : "Place Order"}
                </Text>
            </Pressable>

            {paymentError && (
                <Text className="mt-3 text-center text-red-600">
                    {paymentError}
                </Text>
            )}
        </ScrollView>
    );
}