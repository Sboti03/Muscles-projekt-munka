import {PropsWithChildren, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {User} from "../Types/User";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import newAccessToken from "./Refresh/RefreshTokens";
import {Methods, singleFetch} from "../utils/Fetch";
import './Auth.css'
import {RegisterData} from "./Register/RegisterData";
import {LoginResponse} from "./Login/LoginFetch";


const newAccessTokenTime = 1000 * 60 * 30

function AuthContextProvider(props: PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const {changePage} = useContext(NavigatorContext)
    saveObject(user, 'user')

    useEffect(()=> {
        const newTokenTimer = setInterval(async () => {
            const result = handleAccessToken()
            if (!result) {
                login()
            }
        }, newAccessTokenTime)
        return ()=> {
            clearInterval(newTokenTimer)
        }
    }, [])

    useEffect(()=> {
        const isUserExist = loadUser()
        if (isUserExist) {
            handleAccessToken().then(result=> {
                if (result) {
                    changePage(Page.HOME)
                } else {
                    changePage(Page.LOGIN)
                }
            })
        } else {
            changePage(Page.LOGIN)
        }
    }, [])


    function loadUser() {
        const user = loadObject<User>('user')
        if (user) {
            setUser(user)
            return true
        }
        return false
    }



    async function handleAccessToken() {
        const result = await newAccessToken()
        if (result) {
            if (result.response) {
                return true
            } else {
                console.error(result.error)
                return false
            }
        }
        return false
    }

    function logout() {
        singleFetch('/api/auth/logout', Methods.GET)
        setUser(undefined)
        window.localStorage.setItem('user', '')
        changePage(Page.LOGIN)
    }

    function login() {
        changePage(Page.LOGIN)
    }

    async function register(registerData:RegisterData) {
        const {response, error} = await singleFetch<LoginResponse>('api/auth/register', Methods.POST, registerData)
        if (error) {
            return {error, response: undefined}
        }
        return {response, error: undefined}
    }

    return (
        <AuthContext.Provider
            value={{user, setUser, login, logout, register}}>
            {props.children}
        </AuthContext.Provider>
    )
}


function saveObject(object: any, path: string) {
    useEffect(() => {
        if (object !== undefined) {
            window.localStorage.setItem(path, JSON.stringify(object))
        }
    }, [object])
}


function loadObject<T>(path: string) {
    const save = window.localStorage.getItem(path)
    if (save) {
        if (JSON.parse(save) !== null) {
            return JSON.parse(save) as T
        }
    }
}


export default AuthContextProvider