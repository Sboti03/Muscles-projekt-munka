import {PropsWithChildren, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {User} from "../Types/User";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import {RoleEnum} from "../Types/Roles";
import newAccessToken from "./Refresh/RefreshTokens";
import {Methods, singleFetch} from "../utils/Fetch";
import {Simulate} from "react-dom/test-utils";


function AuthContextProvider(props: PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [isAccessTokenExpired, setIsAccessTokenExpired] = useState(false)
    const {changePage} = useContext(NavigatorContext)

    useEffect(() => {
        if (user !== undefined) {
            window.localStorage.setItem('user', JSON.stringify(user))
        }
    }, [user])

    useEffect(() => {
        if (isAccessTokenExpired) {
            setIsAccessTokenExpired(false)
            newAccessToken().then(r => {
                console.log(r)
            })
        }
    }, [isAccessTokenExpired])

    useEffect(() => {
        const accessTokenRedirect = async (page: Page) => {
            const result = await newAccessToken()
            if (result!.response) {
                changePage(page)
            } else {
                changePage(Page.LOGIN)
            }
        }

        const save = window.localStorage.getItem('user')
        if (save) {
            if (JSON.parse(save) !== null) {
                const savedUser = JSON.parse(save) as User
                setUser(savedUser)
                let page = Page.HOME
                if (savedUser.roles.roleName === RoleEnum.ADMIN) {
                    page = Page.ADMIN
                }
                accessTokenRedirect(page)

            }

        }
    }, [])

    function logout() {
        singleFetch('/api/auth/logout', Methods.GET).then(() => {
            setUser(undefined)
            window.localStorage.setItem('user', '')
            changePage(Page.LOGIN)
        })
    }

    function login() {
        changePage(Page.LOGIN)
    }

    return (
        <AuthContext.Provider value={{user, setUser, setIsAccessTokenExpired, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider