import { api } from "./client";
import type {
    MenuCategory,
    MenuItem,
} from "../types/menu";

export async function getOnlineMenu(): Promise<MenuItem[]> {
    const response = await api.get<MenuItem[]>(
        "/api/v1/menu/online"
    );

    return response.data;
}

export async function getMenuItem(id: number): Promise<MenuItem> {
    const response = await api.get<MenuItem>(
        `/api/v1/menu/${id}`
    );

    return response.data;
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
    const response = await api.get<MenuCategory[]>(
        "/api/v1/menu-category"
    );

    return response.data;
}