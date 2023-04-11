import {PropsWithChildren, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {User} from "../Types/User";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import newAccessToken from "./Refresh/RefreshTokens";
import {Methods, singleFetch} from "../utils/Fetch";
import './Auth.css'
import {RegisterData} from "./Register/RegisterData";
import {LoginResponse} from "./Login/LoginFetch";
import {RoleEnum} from "../Types/Role";


const newAccessTokenTime = 1000 * 60 * 30

function AuthContextProvider(props: PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const {changePage} = useContext(NavigatorContext)

    useEffect(()=> {
        handlePageLoadFirstTime()
    }, [])


    function createAccessTokenRefresher() {
        const newTokenTimer = setInterval(async () => {
            const result = handleAccessToken()
            if (!result) {
                changePage(Page.LOGIN)
            }
        }, newAccessTokenTime)
        return ()=> {
            clearInterval(newTokenTimer)
        }
    }

    function handlePageLoadFirstTime() {
        const user = loadUser()
        console.log(user, 'user')
        if (user) {
            handleAccessToken().then(result=> {
                if (result) {
                    // changePage(Page.LOGIN)
                    redirectUser(user.role.roleName)
                } else {
                    changePage(Page.LOGIN)
                }
            })
        } else {
            changePage(Page.WELCOME)
        }
    }

    function loadUser() {
        const user = loadObject<User>('user')
        if (user) {
            createAccessTokenRefresher()
            setUser(user)
            return user
        }
        return undefined
    }



    async function handleAccessToken() {
        const result = await newAccessToken()
        if (result) {
            return !!result.response;
        }
        return false
    }

    function logout() {
        singleFetch('/api/auth/logout', Methods.GET)
        setUser(undefined)
        window.localStorage.setItem('user', '')
        changePage(Page.LOGIN)
    }


    async function register(registerData:RegisterData) {
        const {response, error} = await singleFetch<LoginResponse>('api/auth/register', Methods.POST, registerData)
        if (error) {
            return {error, response: undefined}
        }
        if (response) {
            setUser(response.user)
            saveObject(response.user, "user")
        }
        return {response, error: undefined}
    }


    function redirectUser(role: RoleEnum) {
        switch (role) {
            case RoleEnum.ADMIN:
                break
            case RoleEnum.USER:
                changePage(Page.HOME)
                break
            case RoleEnum.COACH:
                changePage(Page.COACH_HOME)
                break
        }
    }

    async function login(email: string, password: string) {
        const result = await singleFetch<LoginResponse>('/api/auth/login', Methods.POST, {email: email, password: password})
        console.log(result.response, 'response')
        if (result.response) {
            setUser(result.response.user)
            saveObject(result.response.user, "user")
            redirectUser(result.response.user.role.roleName);
            return -1
        } else {
            return result.error.statusCode
        }

    }

    return (
        <AuthContext.Provider
            value={{user, setUser, login, logout, register}}>
            {props.children}
        </AuthContext.Provider>
    )
}


function saveObject(object: any, path: string) {
    if (object !== undefined) {
        window.localStorage.setItem(path, JSON.stringify(object))
    }
}


function loadObject<T>(path: string) {
    const save = window.localStorage.getItem(path)
    if (save) {
        if (JSON.parse(save) !== null) {
            return JSON.parse(save) satisfies T
        }
    }
}


export default AuthContextProvider