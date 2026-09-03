import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import {
    getDeliveryAddresses,
    addDeliveryAddress,
} from "../api/addresses";

export function useDeliveryAddresses() {
    return useQuery({
        queryKey: ["delivery-addresses"],
        queryFn: getDeliveryAddresses,
    });
}

export function useAddDeliveryAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addDeliveryAddress,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["delivery-addresses"],
            });
        },
    });
}