import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import OrderContext from "../context/Order/OrderContext";
import DeliveryAddressContext from "../context/Auth/DeliveryAddressContext";
import CartContext from "../context/Cart/CartContext";

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  const { getDeliveryAddresses, addDeliveryAddress } = useContext(DeliveryAddressContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    guestName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    contact: "",
    type: "Home",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addressList = await getDeliveryAddresses();
        addressList && setAddresses(addressList);
        setSelectedAddress(addressList[0]?.id || null);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    user && fetchAddresses();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    try {
      if (user) {
        const res = await createOrder({
          deliveryAddressId: selectedAddress
        });
      }
      else {
        const addressData = {
          ...formData,
          userId: null,
        };
        const address = await addDeliveryAddress(addressData);
        if (address) {
          const res = await createOrder({
            deliveryAddressId: address.id,
            items: cart?.cartItems,
            totalAmount: cart?.total,
          });
        }
      }

      clearCart();

      navigate("/order-success", { state: { isLoggedIn: !!user } });

    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="font-text1 max-w-[80%] pt-10 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-maroon">Checkout</h1>
      <div className="flex-col-reverse lg:grid lg:grid-cols-[2fr_1.5fr] gap-[10%] border p-5">
        <div>
          <h3 className="text-lg font-bold mb-5 bg-white">Delivery Address {!user && <span className="text-red-500 text-sm">* (mandatory)</span>}</h3>
          <div>
            {user
              ? (
                <select name="type" className="border w-full p-2 bg-white">
                  {addresses.map((address) => (
                    <option key={address.id} value={address.type} onChange={(e) => setSelectedAddress(e.target.value.id)}>
                      {address.type} ({address.contact}) - {address.address}, {address.city}, {address.state}, {address.country} - {address.zipCode}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="space-y-3">
                  <input name="guestName" placeholder="Name" className="border w-full p-2 bg-white" onChange={handleChange} />
                  <input name="address" placeholder="Address" className="border w-full p-2 bg-white" onChange={handleChange} />
                  <input name="city" placeholder="City" className="border w-full p-2 bg-white" onChange={handleChange} />
                  <input name="state" placeholder="State" className="border w-full p-2 bg-white" onChange={handleChange} />
                  <input name="country" placeholder="Country" className="border w-full p-2 bg-white" onChange={handleChange} />
                  <input name="zipCode" placeholder="Zip Code" className="border w-full p-2 bg-white" onChange={handleChange} />
                  <input name="contact" placeholder="Phone Number" className="border w-full p-2 bg-white" onChange={handleChange} />
                  <select name="type" className="border-2 w-full p-2 bg-white" onChange={handleChange}>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}
          </div>
        </div>

        <div className="flex flex-col justify-between border-2 border-maroon p-5 shadow-md">
          <div className="flex flex-col justify-between my-4">
            <div>
              <h2 className="text-xl font-bold mb-5">Order Summary</h2>
              <ul className="">
                {cart?.cartItems.map(item => (
                  <li key={item.menuItem?.id || item.menuItemId} className="flex justify-between py-1 border-b">
                    <span>{item.menuItem?.name || "Item"} × {item.quantity}</span>
                    <span>₹ {item.menuItem?.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex justify-between font-semibold mt-2 text-lg"><span>Total</span> ₹{Number(cart?.total).toFixed(2)}</p>
          </div>

          <button
            onClick={handleOrder}
            className="bg-green-600 hover:bg-green-700 text-lg text-white font-bold py-2 px-4 w-full rounded"
          >
            Place Order (Cash on Delivery)
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;