import { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import CartContext from "../context/Cart/CartContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const { cart, updateCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open && isMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isMobile]);

  if (["/signup", "/login", "/checkout", "/orders", "/order-success"].includes(pathname)) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ease-in-out ${open ? "bg-black bg-opacity-30 pointer-events-auto" : "bg-transparent pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
      />

      {/* Cart Panel */}
      <div
        className={`font-text1 fixed right-0 top-[10%] lg:top-20 h-[calc(100%-3rem)] lg:h-[calc(100%-5rem)] w-full lg:w-[400px] bg-white p-4 shadow-lg z-50 transition-transform duration-700 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
        `}
      >
        <h2 className="text-xl font-semibold mb-4">Cart</h2>

        <div className="flex flex-col min-h-[70%] justify-between">

          <div>
            {cart?.cartItems?.length > 0 ?
              cart.cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg">{item.menuItem?.name}</p>
                    <p className="text-sm text-gray-500">₹{item.menuItem?.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">

                    <div className="flex items-center space-x-3 border-2 border-green-500 rounded">
                      <button
                        onClick={() => {
                          if (item?.quantity === 1) { removeFromCart(item.id); }
                          else { updateCart(item.id, item?.quantity - 1); }
                        }}
                        className="px-2 text-green-500 hover:text-green-700 hover:text-lg"
                      >
                        <FaMinusCircle />
                      </button>
                      <span>{item?.quantity}</span>
                      <button
                        onClick={() => updateCart(item.id, item?.quantity + 1)}
                        className="px-2 text-green-500 hover:text-green-700 hover:text-lg"
                      >
                        <FaPlusCircle />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 bg-gray-300 rounded hover:bg-gray-500 hover:border hover:border-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
              : <p className="text-gray-500">Your cart is empty.</p>
            }
          </div>

          <div>
            <div className="w-full flex justify-between items-center mt-4 border-b">
              <p>Subtotal: </p>
              <p>₹ {cart?.total ? Number(cart.total).toFixed(2) : "0.0"}</p>
            </div>
            <div className="w-full flex justify-between items-center mt-4 border-b">
              <p>Total <span className="text-gray-500">(inclusive of taxes)</span>: </p>
              <p>₹ {cart?.total ? Number(cart.total).toFixed(2) : "0.0"}</p>
            </div>
          </div>

        </div>

        <div className="py-5 lg:pt-5 lg:pb-14">
          <Link to="/checkout" onClick={() => setOpen(!open)} className=" block text-center bg-green-600 hover:bg-green-700 p-2 text-white font-extrabold text-xl">Checkout</Link>
        </div>

      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed z-50 w-12 h-12 bg-white rounded-full shadow-lg border flex items-center justify-center transition duration-500 ease-in-out
          ${open && isMobile
            ? "top-[10%] right-4"
            : "bottom-4 right-4"
          }
        `}
      >
        {open ? "✕" : "🛒"}
      </button>
    </>
  );
};

export default Cart;