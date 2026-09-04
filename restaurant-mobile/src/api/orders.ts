import { api } from "./client";

import type {
    CreateOrderPayload,
    OrderDetail,
    OrderHistoryItem,
} from "../types/order";

export async function createOrder(payload: CreateOrderPayload) {
    const response = await api.post(
        "api/v1/order",
        payload
    );

    return response.data;
}

export async function getOrders(): Promise<OrderHistoryItem[]> {
    const response = await api.get(
        "/api/v1/order"
    );

    return response.data.orders ?? response.data;
}

export async function getOrder(id: number): Promise<OrderDetail> {
    const response = await api.get<OrderDetail>(
        `/api/v1/order/${id}`
    );

    return response.data;
}