import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import OrderContext from "../context/Order/OrderContext";
import Spinner from "../components/Spinner";

const OrdersPage = () => {
  const { getOrderByUserId } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderList = await getOrderByUserId();
        orderList && setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-[80%] pt-20 mx-auto">
      <h1 className="text-2xl font-bold text-maroon mb-10">My Orders</h1>
      <div className="flex-col text-gray-700">
        {orders && orders.length > 0 ? orders.map(order => (
          <Link to={`/orders/${order?.id}`} key={order?.id} className="grid grid-cols-3 gap-4 p-4 items-center border border-maroon mb-5 shadow-lg ">
            <div>
              <h2 className="text-lg font-medium mb-3">Order ##{order?.id}</h2>
              <p>Items: {order?.itemCount}</p>
              <p>Status: {order?.status}</p>
            </div>
            <div>
              <p className="font-medium">{order?.deliveryAddress?.type}</p>
              <p>{order?.deliveryAddress?.address}</p>
              <p>{order?.deliveryAddress?.city}, {order?.deliveryAddress?.state} - {order?.deliveryAddress?.zipCode}</p>
              <p>{order?.deliveryAddress?.contact}</p>
            </div>
            <div>
              <p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
              <p>Total: ₹ {order?.totalAmount}</p>
            </div>
          </Link>
        )) :
          <div className="text-lg font-bold text-gray-500">No orders found.</div>
        }
      </div>

    </div>
  );
};
export default OrdersPage;