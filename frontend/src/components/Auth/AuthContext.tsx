import React from "react";
import {User} from "../Types/User";


interface AuthContextValue {
    user: User | undefined,
    setUser: (user: User | undefined) => void,
    setIsAccessTokenExpired: (isAccessTokenExpired: boolean) => void,
    login: () => void,
    logout: () => void,
}


const AuthContext = React.createContext<AuthContextValue>(null as any)

export default AuthContext