import { create } from "zustand";

import type { MenuItem } from "../types/menu";

export interface CartItem {
    menuItem: MenuItem;
    quantity: number;
}

interface CartState {
    items: CartItem[];

    addItem: (menuItem: MenuItem) => void;
    removeItem: (menuItemId: number) => void;
    updateQuantity: (
        menuItemId: number,
        quantity: number
    ) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],

    addItem: (menuItem) =>
        set((state) => {
            const existingItem = state.items.find(
                (item) => item.menuItem.id === menuItem.id
            );

            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.menuItem.id === menuItem.id
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item
                    ),
                };
            }

            return {
                items: [
                    ...state.items,
                    {
                        menuItem,
                        quantity: 1,
                    },
                ],
            };
        }),

    removeItem: (menuItemId) =>
        set((state) => ({
            items: state.items.filter(
                (item) => item.menuItem.id !== menuItemId
            ),
        })),

    updateQuantity: (menuItemId, quantity) =>
        set((state) => {
            if (quantity <= 0) {
                return {
                    items: state.items.filter(
                        (item) =>
                            item.menuItem.id !== menuItemId
                    ),
                };
            }

            return {
                items: state.items.map((item) =>
                    item.menuItem.id === menuItemId
                        ? {
                            ...item,
                            quantity,
                        }
                        : item
                ),
            };
        }),

    clearCart: () => set({ items: [] }),
}));