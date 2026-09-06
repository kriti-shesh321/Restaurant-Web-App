import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createOrder,
    getOrder,
    getOrders,
} from "../api/orders";

import type { CreateOrderPayload } from "../types/order";

const ACTIVE_STATUSES = [
    "Pending",
    "Confirmed",
    "Preparing Order",
    "Ready",
    "Out for Delivery",
] as const;

export function useOrders() {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });
}

export function useOrder(id: number) {
    return useQuery({
        queryKey: ["orders", id],
        queryFn: () => getOrder(id),
        enabled: Number.isInteger(id) && id > 0,

        refetchInterval: (query) => {
            const status = query.state.data?.status;

            if (
                status &&
                ACTIVE_STATUSES.includes(
                    status as typeof ACTIVE_STATUSES[number]
                )
            ) {
                return 5000;
            }

            return false;
        },
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateOrderPayload) => createOrder(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
    });
}