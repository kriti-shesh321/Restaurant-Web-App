import axiosInstance from "../../api/axios";
import { createContext } from "react";

const DeliveryAddressContext = createContext();

const DeliveryAddressProvider = ({ children }) => {

    const getDeliveryAddresses = async () => {
        const { data } = await axiosInstance.get("/addresses");
        return data;
    };

    const addDeliveryAddress = async (details) => {
        const { data } = await axiosInstance.post("/addresses", details);
        return data;
    };

    const editDeliveryAddress = async (id, details) => {
        const { data } = await axiosInstance.put(`/addresses/${id}`, details);
        return data;
    };

    const deleteDeliveryAddress = async (id) => {
        const { data } = await axiosInstance.delete(`/addresses/${id}`);
        return data;
    };

    return (
        <DeliveryAddressContext.Provider
            value={{
                getDeliveryAddresses,
                addDeliveryAddress,
                editDeliveryAddress,
                deleteDeliveryAddress
            }}
        >
            {children}
        </DeliveryAddressContext.Provider>
    );
};

export { DeliveryAddressContext as default, DeliveryAddressProvider };