import React from "react";
import {User} from "../Types/User";
import {RegisterData} from "./Register/RegisterData";


interface AuthContextValue {
    user: User | undefined,
    setUser: (user: User | undefined) => void,
    login: () => void,
    logout: () => void,
    register: (registerData: RegisterData) =>  Promise<{error: any, response: undefined} | {response: unknown, error: undefined}>
}


const AuthContext = React.createContext<AuthContextValue>(null as any)

export default AuthContext