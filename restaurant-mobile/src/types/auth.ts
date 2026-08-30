export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface SignupResponse {
    id: number;
    name: string;
    email: string;
}