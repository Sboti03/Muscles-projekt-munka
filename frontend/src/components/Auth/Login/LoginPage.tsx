import './Login.css'
import {FormEvent, useContext, useState} from "react";
import AuthContext from "../AuthContext";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import { Input} from "@mui/joy";
import Mail from '../../../assets/SVG/mail.svg'
import Lock from '../../../assets/SVG/Lock.svg'
import Eye from '../../../assets/SVG/eye.svg'
import {Methods, singleFetch} from "../../utils/Fetch";
import {LoginResponse} from "./LoginFetch";
import { Button } from '@mui/joy';
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";


function LoginPage() {
    const {login} = useContext(AuthContext)
    const {changePage} = useContext(NavigatorContext)
    const {t} = useTranslation()
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let email = ""
        let password = ""
        for (let i = 0; i < event.currentTarget.length; i++) {
            const input = event.currentTarget[i] as HTMLInputElement
            switch (input.name) {
                case "email":
                    email = input.value;
                    break;
                case 'password':
                    password = input.value;
                    break;
            }
        }

        if (email === "") {
            toast.error("Email should not be empty")
            return;
        }
        if (password === "") {
            toast.error("Password should not be empty")
            return;
        }

        const result = await login(email, password)
        if (result !== -1) {
            switch (result) {
                case 400:
                    toast.error(t("login.error.bad-request"))
                    break
                case 403:
                    toast.error(t("login.error.no-user"))
                    break
                case 423:
                    toast.error(t("login.error.blocked"))
                    break
            }
        } else {
            toast.info(t("login.success"))
        }

    }



    function loadRegister() {
        changePage(Page.REGISTER)
    }

    return (
        <div className='welcome-bg'>
            <form onSubmit={handleFormSubmit} className="login-box">
                <div className="login-box-elements">
                    <div>
                        <Input className="Input" startDecorator={<img src={Mail}/>} placeholder="Email" name="email"/>
                    </div>
                    <div>
                        <Input className="Input" startDecorator={<img src={Lock} />} endDecorator={<button className="classic-btn"><img src={Eye}/></button>} placeholder="Password" name="password"/>
                    </div>
                    <div className="flex justify-center">
                        <Button className="w-1/2" type="submit">Login</Button>
                    </div>
                    <div className="flex justify-center">
                        <Button className='w-1/3' onClick={loadRegister} type='button'>Register</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
