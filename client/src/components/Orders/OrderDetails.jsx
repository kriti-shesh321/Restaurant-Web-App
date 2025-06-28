import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderContext from "../../context/Order/OrderContext";
import { formatReadableDate } from "../../utils/formatDate";

const OrderDetails = () => {
    const { id } = useParams();
    const { getOrderById } = useContext(OrderContext);
    const [order, setOrder] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await getOrderById(id);
                setOrder(orderData);
                console.log("Fetched order:", orderData);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };
        fetchOrder();
    }, [id]);

    if (!order) return <div className="mt-[30%] text-center">Loading...</div>;

    const { deliveryAddress, totalAmount, createdAt, status, items } = order;

    return (
        <div className="pt-14 px-6 md:px-40 font-text1">
            <h1 className="text-2xl font-bold mb-8 text-maroon">Order Details</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-700">
                
                <div className="p-5 border shadow-md bg-white">
                    <h2 className="text-lg font-medium mb-5">Items in Order</h2>
                    <ul className="space-y-4">
                        {items?.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between border-b pb-2 text-sm"
                            >
                                <span>{item.menuItem.name} × {item.quantity}</span>
                                <span>₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-6">
                    <div className="p-5 border shadow-md bg-white">
                        <h2 className="text-lg font-medium mb-3">Delivery Address</h2>
                        <p>{deliveryAddress?.type} - {deliveryAddress?.contact}</p>
                        <p>{deliveryAddress?.address}, {deliveryAddress?.city}</p>
                        <p>{deliveryAddress?.state}, {deliveryAddress?.country} - {deliveryAddress?.zipCode}</p>
                    </div>

                    <div className="p-5 border shadow-md bg-white">
                        <h2 className="text-lg font-medium mb-3">Order Summary</h2>
                        <p className="flex justify-between border-b"><span className="font-semibold">Status:</span> {status}</p>
                        <p className="flex justify-between border-b"><span className="font-semibold">Total Amount:</span> ₹{totalAmount}</p>
                        <p className="flex justify-between border-b"><span className="font-semibold">Ordered At:</span> {formatReadableDate(createdAt)}</p>
                        <p className="flex justify-between border-b"><span className="font-semibold">Order ID:</span> ##{order.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderDetails;