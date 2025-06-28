import { createContext, useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

const MenuCategoryContext = createContext();

const MenuCategoryProvider = ({ children }) => {

    const getMenuCategories = async () => {
        try {
            const { data } = await axiosInstance.get("/menu-category");
            return data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <MenuCategoryContext.Provider
            value={{
                getMenuCategories,
            }}
        >
            {children}
        </MenuCategoryContext.Provider>
    );
};

export { MenuCategoryContext as default, MenuCategoryProvider };