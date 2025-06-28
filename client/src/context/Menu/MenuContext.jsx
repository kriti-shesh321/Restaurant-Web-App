import { createContext, useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {

    const onlineMenu = async (limit) => {
        try {
            const { data } = await axiosInstance.get("/menu/online", {
                params: { limit }
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const offlineMenu = async () => {
        const { data } = await axiosInstance.get("/menu/offline");
        return data;
    };   

    return (
        <MenuContext.Provider
            value={{
                onlineMenu,
                offlineMenu,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext as default, MenuProvider };