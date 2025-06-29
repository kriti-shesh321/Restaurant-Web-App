import axiosInstance from "../../api/axios.js";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ cartItems: [], total: 0 });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getCart = async () => {
        try {
            const { data } = await axiosInstance.get("/cart");
            return data;
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const loadCartAfterLogin = async () => {
        try {
            const { cartItems, total } = await getCart();
            setIsLoggedIn(true);
            setCart({ cartItems, total });
        } catch (error) {
            console.error("Error loading cart after login:", error);
        }
    };

    const addToCart = async (menuItemId, qty) => {
        try {
            if (isLoggedIn) {
                await axiosInstance.post("/cart", { menuItemId, quantity: qty });
                const { cartItems, total } = await getCart();
                setCart({ cartItems, total });
            } else {
                const { data: menuItem } = await axiosInstance.get(`/menu/${menuItemId}`);

                const localCart = [...cart.cartItems];
                const existingItem = localCart.find((item) => item.menuItem.id === menuItemId);
                if (existingItem) {
                    existingItem.quantity += qty;
                } else {
                    localCart.push({
                        id: menuItemId,
                        quantity: qty,
                        menuItem
                    });
                }
                const total = localCart.reduce((acc, item) => acc + parseFloat(item.menuItem.price) * item.quantity, 0);
                const updatedCart = { cartItems: localCart, total };
                setCart(updatedCart);
                localStorage.setItem("guestCart", JSON.stringify(updatedCart));
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const updateCart = async (cartId, quantity) => {
        try {
            if (isLoggedIn) {
                await axiosInstance.patch(`/cart/${cartId}`, { quantity });
                const { cartItems, total } = await getCart();
                setCart({ cartItems, total });
            } else {
                const updatedCartItems = cart.cartItems.map((item) => {
                    if (item.id === cartId) {
                        return { ...item, quantity };
                    }
                    return item;
                });

                const total = updatedCartItems.reduce((acc, item) => acc + parseFloat(item.menuItem.price) * item.quantity, 0);
                const updatedCart = { cartItems: updatedCartItems, total };
                setCart(updatedCart);
                localStorage.setItem("guestCart", JSON.stringify(updatedCart));
            }

        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    const removeFromCart = async (cartId) => {
        try {
            if (isLoggedIn) {
                await axiosInstance.patch(`/cart/${cartId}`, { quantity: 0 });
                const { cartItems, total } = await getCart();
                setCart({ cartItems, total });
            } else {
                const updatedCartItems = cart.cartItems.filter(item => item.id !== cartId);
                const total = updatedCartItems.reduce((acc, item) => acc + parseFloat(item.menuItem.price) * item.quantity, 0);
                const updatedCart = { cartItems: updatedCartItems, total };
                setCart(updatedCart);
                localStorage.setItem("guestCart", JSON.stringify(updatedCart));
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const clearCart = () => {
        setCart({ cartItems: [], total: 0 });
        localStorage.removeItem("guestCart");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const loadCart = async () => {
            if (token) {
                const cartData = await getCart();
                cartData && setCart(cartData);
            } else {
                const localCart = JSON.parse(localStorage.getItem("guestCart")) || { cartItems: [], total: 0 };
                setCart(localCart);
            }
        };
        loadCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, loadCartAfterLogin, addToCart, updateCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext as default, CartProvider };