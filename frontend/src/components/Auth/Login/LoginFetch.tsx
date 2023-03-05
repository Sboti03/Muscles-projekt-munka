import {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../../Types/User";
import {Tokens} from "../../Types/Tokens";


export interface LoginData {
    email: string,
    password: string
}

export interface LoginResponse {
    user: User,
    tokens: Tokens
}

export function usePostLogin(loginData: LoginData | undefined) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState<LoginResponse>(null as any)

    useEffect(()=> {
        if (loginData !== undefined) {
            const req = axios.post('/api/auth/login', loginData)
            req.then(res => {
                setResponse(res.data as LoginResponse)
            })
            req.catch(e => {
                setError(e.response.data)
            })
            req.finally(() => {
                setIsLoading(false)
            })
        }
    }, [loginData])

    return {isLoading, error, response}
}