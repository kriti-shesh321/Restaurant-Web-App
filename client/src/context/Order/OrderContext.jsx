import { createContext } from "react";
import axiosInstance from "../../api/axios";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {

    const createOrder = async (details) => {
        const { data } = await axiosInstance.post('/order', details);
        return data;
    };

    const getOrderById = async (id) => {
        const { data } = await axiosInstance.get(`/order/${id}`);
        return data;
    };

    const getOrderByUserId = async () => {
        const { data } = await axiosInstance.get('/order');
        return data;
    };

    return (
        <OrderContext.Provider value={{ createOrder, getOrderByUserId, getOrderById }}>
            {children}
        </OrderContext.Provider>
    );

};

export { OrderContext as default, OrderProvider };