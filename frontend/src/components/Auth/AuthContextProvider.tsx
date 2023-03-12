import {PropsWithChildren, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {User} from "../Types/User";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import newAccessToken from "./Refresh/RefreshTokens";
import {Methods, singleFetch} from "../utils/Fetch";


const newAccessTokenTime = 1000 * 60 * 30

function AuthContextProvider(props: PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [isAccessTokenExpired, setIsAccessTokenExpired] = useState(false)
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
        if (user) {
            setUser(user)
        }
        accessTokenRedirect(Page.HOME)
    }, [])

    useEffect(() => {
        if (isAccessTokenExpired) {
            setIsAccessTokenExpired(false)
            newAccessToken().then(r => {
                console.log(r)
            })
        }
    }, [isAccessTokenExpired])

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

    return (
        <AuthContext.Provider
            value={{user, setUser, setIsAccessTokenExpired, login, logout}}>
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