export type OrderType = "delivery" | "dine-in";

export interface CreateOrderItem {
    menuItemId: number;
    quantity: number;
}

export interface CreateOrderPayload {
    orderType: OrderType;
    deliveryAddressId?: number;
    tableNumber?: string;
    items: CreateOrderItem[];
}