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

export type PaymentStatus =
    | "pending"
    | "processing"
    | "succeeded"
    | "failed"
    | "canceled";

export interface CreateOrderItem {
    menuItemId: number;
    quantity: number;
}

export interface CreateOrderPayload {
    orderType: OrderType;
    deliveryAddressId?: number;
    tableNumber?: string;
    items: CreateOrderItem[];
    paymentMethod: "cash" | "card";
}

export interface OrderPayment {
    status: PaymentStatus;
    provider: string;
    amount: string;
    currency: string;
}

export interface OrderHistoryItem {
    id: number;
    userId: number | null;
    orderType: OrderType;
    deliveryAddressId: number | null;
    tableNumber: string | null;
    status: OrderStatus;
    totalAmount: string;
    payment?: OrderPayment | null;
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