import {FormEvent, useContext, useEffect, useState} from "react";
import {LoginData, usePostLogin} from "./LoginFetch";
import AuthContext from "../AuthContext";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import {RoleEnum} from "../../Types/Roles";

function LoginPage() {
    const {setUser} = useContext(AuthContext)
    const [loginData, setLoginData] = useState<LoginData | undefined>(undefined)
    const {isLoading, error, response} = usePostLogin(loginData)
    const {changePage} = useContext(NavigatorContext)

    const login = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.currentTarget[0] as HTMLInputElement).value
        const password = (event.currentTarget[1] as HTMLInputElement).value
        setLoginData({email, password})
    }

    useEffect(()=> {
        if (response) {
            setUser(response.user)
            if (response.user.roles.roleName === RoleEnum.ADMIN) {
                changePage(Page.ADMIN)
            } else {
                changePage(Page.HOME)
            }
        }
    }, [response])

    return (
        <>
            <form onSubmit={login}>
                <label>
                    <div>Email</div>
                    <div><input name="email" placeholder="email"/></div>
                </label>
                <label>
                    <div>Password</div>
                    <div><input name="password" placeholder="password"/></div>
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage
