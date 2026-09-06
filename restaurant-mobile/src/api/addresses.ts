import { api } from "./client";

export async function getDeliveryAddresses() {
    const response = await api.get("api/v1/addresses");
    return response.data;
}

export async function addDeliveryAddress(
    payload: {
        type: "Home" | "Work" | "Other";
        address: string;
        contact?: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    }
) {
    const response = await api.post(
        "api/v1/addresses",
        payload
    );
    return response.data;
}