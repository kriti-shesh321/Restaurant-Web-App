import { api } from "./client";

export interface CreatePaymentIntentResponse {
    orderId: number;
    paymentId: number;
    clientSecret: string;
}

export async function createPaymentIntent(
    orderId: number
): Promise<CreatePaymentIntentResponse> {
    const response =
        await api.post<CreatePaymentIntentResponse>(
            "/api/v1/payment/create-intent",
            { orderId }
        );

    return response.data;
}