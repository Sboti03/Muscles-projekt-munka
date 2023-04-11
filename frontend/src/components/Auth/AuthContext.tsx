import React from "react";
import {User} from "../Types/User";
import {RegisterData} from "./Register/RegisterData";
import {LoginResponse} from "./Login/LoginFetch";


interface AuthContextValue {
    user: User | undefined,
    setUser: (user: User | undefined) => void,
    login: (email: string, password: string) => Promise<number>,
    logout: () => void,
    register: (registerData: RegisterData) =>  Promise<{error: any, response: undefined} | {response: LoginResponse | undefined, error: undefined}>
}


const AuthContext = React.createContext<AuthContextValue>(null as any)

export default AuthContext