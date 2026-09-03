import { api } from "./client";

import type { CreateOrderPayload, } from "../types/order";

export async function createOrder(
    payload: CreateOrderPayload
) {
    const response = await api.post(
        "api/v1/order",
        payload
    );

    return response.data;
}