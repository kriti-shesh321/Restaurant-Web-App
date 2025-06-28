import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../../api/axios.js";
import CartContext from "../Cart/CartContext.jsx";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { loadCartAfterLogin } = useContext(CartContext);

    const signUp = async (details) => {
        try {
            await axiosInstance.post("/user/signup", details);

            const { data } = await axiosInstance.post("/user/login", {
                email: details.email,
                password: details.password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);

        } catch (error) {
            throw error;
        }
    };

    const login = async (details) => {
        const { data } = await axiosInstance.post("/user/login", details);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        await loadCartAfterLogin();
    };

    const getUser = async () => {
        const { data } = await axiosInstance.get("/user");
        return data;
    };

    const updateUser = async (details) => {
        const { data } = await axiosInstance.put("/user", details, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    };

    const deleteUser = async () => {
        const { data } = await axiosInstance.delete('/user');
        localStorage.removeItem("token");
        setUser(null);
        return data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signUp,
                login,
                getUser,
                updateUser,
                deleteUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext as default, AuthProvider };