import {PropsWithChildren, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {User} from "../Types/User";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import newAccessToken from "./Refresh/RefreshTokens";
import {Methods, singleFetch} from "../utils/Fetch";
import './Auth.css'
import {RegisterData} from "./Register/RegisterData";

const newAccessTokenTime = 1000 * 60 * 30

function AuthContextProvider(props: PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const {changePage} = useContext(NavigatorContext)
    saveObject(user, 'user')

    useEffect(()=> {
        const newTokenTimer = setInterval(async () => {
            const result = await newAccessToken()
            if (result?.error) {
                login()
            }
        }, newAccessTokenTime)
        return ()=> {
            clearInterval(newTokenTimer)
        }
    }, [])

    useEffect(()=> {
        const user = loadObject<User>('user')
        setUser(user)
        if (user) {
            authRedirect()
        }
        changePage(Page.LOGIN)
    }, [])

    async function authRedirect() {
        const profile = await isProfileExist()
        if (profile) {
            getGoals()
        }
    }

    async function getGoals() {
        const {response, error} = await singleFetch('/api/goals', Methods.GET)
        console.log(response, error)
    }

    async function isProfileExist() {
        const {response, error} = await singleFetch('/api/profile', Methods.GET)
        return !error;

    }

    const accessTokenRedirect = async (page: Page) => {
        const result = await newAccessToken()
        if (result!.response) {
            changePage(page)
        } else {
            login()
        }
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
        const {response, error} = await singleFetch('api/auth/register', Methods.POST, registerData)
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