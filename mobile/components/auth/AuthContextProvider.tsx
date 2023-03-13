import {PropsWithChildren, useContext, useEffect, useState} from "react";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import AuthContext, {AuthContextValue} from "./AuthContext";
import newRefreshToken from "./refresh/refreshToken";
import axios from "axios";
import {BASE_URL} from "@env";
import User from "./types/user";

const logoutAPI = BASE_URL + 'api/auth/logout'
const loginAPI: string = BASE_URL + 'api/auth/login'


function AuthContextProvider(props:PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [isAccessTokenExpired, setIsAccessTokenExpired] = useState(false)
    const {changePage} = useContext(NavigatorContext)


    useEffect(()=> {
        if (isAccessTokenExpired) {
            setIsAccessTokenExpired(false)
            newRefreshToken().then(response  => {
                console.log(response)
            })
        }
    }, [isAccessTokenExpired])

    const authContextValue: AuthContextValue = {
        user: user,
        setUser: (user: User | undefined) => {
            setUser(user)
        },
        setIsAccessTokenExpired: () => {

        },
        login: (email: string, password: string) => {
            axios.post(loginAPI, {email: email, password: password})
                .then(function (response) {
                    console.log(response.data)
                    setUser(response.data as User)
                    changePage(Page.HOME)
                },).catch(function (error) {
                console.log(error.request)
            })
        },
        logout: () => {
            axios.get(logoutAPI)
                .then(function (response) {
                    console.log(response.data)
                }).catch(function (error) {
                console.log(error)
            })
            setUser(undefined)
            changePage(Page.LOGIN)
        }
    }


    return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider