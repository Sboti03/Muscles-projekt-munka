import React from "react";
import User from "./types/user";


export interface AuthContextValue {
    user: User | undefined,
    setUser: (user: User | undefined) => void,
    setIsAccessTokenExpired: (isAccessTokenExpired: boolean) => void,
    login: (email: string, password: string) => void,
    logout: () => void,
}


const AuthContext = React.createContext<AuthContextValue>(null as any)

export default AuthContext