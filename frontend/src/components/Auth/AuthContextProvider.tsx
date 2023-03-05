import {PropsWithChildren, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {User} from "../Types/User";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import {RoleEnum} from "../Types/Roles";

function AuthContextProvider(props:PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const {changePage} = useContext(NavigatorContext)

    useEffect(()=> {
        if (user !== undefined) {
            window.localStorage.setItem('user', JSON.stringify(user))
        }
    }, [user])

    useEffect(()=> {
        const save = window.localStorage.getItem('user')
        if (save) {
            const savedUser = JSON.parse(save) as User
            setUser(savedUser)
            let page = Page.HOME
            if (savedUser.roles.roleName === RoleEnum.ADMIN) {
                page = Page.ADMIN
            }
            changePage(page)
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider