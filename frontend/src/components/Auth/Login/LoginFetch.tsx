import {Role} from "../../Types/Role";


export interface LoginData {
    email: string,
    password: string
}

export interface LoginResponse {
    user: User,
    tokens: Tokens
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    userId: number;
    email: string;
    roleId: number;
    changedAt: String;
    isBlocked: boolean;
    role: Role;
}
