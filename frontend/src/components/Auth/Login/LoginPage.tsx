import './Login.css'
import {FormEvent, useContext, useEffect, useState} from "react";
import {LoginData, usePostLogin} from "./LoginFetch";
import AuthContext from "../AuthContext";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import {RoleEnum} from "../../Types/Roles";
import {Input} from "@mui/joy";
import Mail from '../../../assets/SVG/mail.svg'
import Lock from '../../../assets/SVG/Lock.svg'
import Eye from '../../../assets/SVG/eye.svg'


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
            <form onSubmit={login} className="login-box">
                <div className="login-box-elements">
                    <div>
                        <Input className="Input" startDecorator={<img src={Mail}/>} placeholder="Email" name="email"/>
                    </div>
                    <div>
                        <Input className="Input" startDecorator={<img src={Lock} />} endDecorator={<button className="classic-btn"><img src={Eye}/></button>} placeholder="Password" name="password"/>
                    </div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage
