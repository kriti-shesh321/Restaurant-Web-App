export type OrderType = "delivery" | "dine-in";

export type OrderStatus =
    | "Pending"
    | "Confirmed"
    | "Preparing Order"
    | "Ready"
    | "Out for Delivery"
    | "Served"
    | "Delivered"
    | "Cancelled";

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

export interface OrderHistoryItem {
    id: number;
    userId: number | null;
    orderType: OrderType;
    deliveryAddressId: number | null;
    tableNumber: string | null;
    status: OrderStatus;
    totalAmount: string;
    itemCount: number;
    createdAt: string;
    updatedAt: string;

    deliveryAddress?: DeliveryAddress | null;
}

export interface OrderItem {
    menuItemId: number;
    quantity: number;
    price: string;

    menuItem: {
        name: string;
    };
}

export interface DeliveryAddress {
    id: number;
    type: string;
    address: string;
    contact: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export interface OrderDetail extends Omit<
    OrderHistoryItem,
    "itemCount"
> {
    items: OrderItem[];
    deliveryAddress?: DeliveryAddress | null;
}