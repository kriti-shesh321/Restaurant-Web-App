import { api } from "./client";
import type {
    SignupResponse,
    LoginResponse,
    User
} from "../types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
        "/api/v1/user/login",
        {
            email,
            password,
        }
    );

    return response.data;
}

export async function signup(name: string, email: string, password: string): Promise<SignupResponse> {
    const response = await api.post<SignupResponse>(
        "/api/v1/user/signup",
        {
            name,
            email,
            password,
        }
    );

    return response.data;
}

export async function getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/api/v1/user");

    return response.data;
}