import { useQuery } from "@tanstack/react-query";

import {
    getOnlineMenu,
    getMenuItem,
    getMenuCategories,
} from "../api/menu";

export function useOnlineMenu() {
    return useQuery({
        queryKey: ["menu", "online"],
        queryFn: getOnlineMenu,
    });
}

export function useMenuItem(id: number) {
    return useQuery({
        queryKey: ["menu", "item", id],
        queryFn: () => getMenuItem(id),
        enabled: Number.isInteger(id) && id > 0,
    });
}

export function useMenuCategories() {
    return useQuery({
        queryKey: ["menu", "categories"],
        queryFn: getMenuCategories,
    });
}