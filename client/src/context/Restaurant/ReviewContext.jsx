import { createContext, useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {

    const getReviews = async (limit) => {
        try {
            const { data } = await axiosInstance.get("/reviews", {
                params: { limit }
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                getReviews,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export { ReviewContext as default, ReviewProvider };