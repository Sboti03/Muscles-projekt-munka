import './Login.css'
import {FormEvent, useContext, useState} from "react";
import AuthContext from "../AuthContext";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import {Alert, Input} from "@mui/joy";
import Mail from '../../../assets/SVG/mail.svg'
import Lock from '../../../assets/SVG/Lock.svg'
import Eye from '../../../assets/SVG/eye.svg'
import {Methods, singleFetch} from "../../utils/Fetch";
import {LoginResponse} from "./LoginFetch";


function LoginPage() {
    const {setUser} = useContext(AuthContext)
    const {changePage} = useContext(NavigatorContext)
    const [alertTimeOut, setAlertTimeOut] = useState<number | undefined>()
    const [alert, setAlert] = useState<string | undefined>(undefined)

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
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
            displayAlert("Email should not be empty")
            return;
        }
        if (password === "") {
            displayAlert("Password should not be empty")
            return;
        }

        const request = login(email, password)
        request.then(result => {
            const {response, error} = result
            if (error) {
                displayAlert("Error: " + error.message)
            } else if (response) {
                setUser(response.user)
                changePage(Page.HOME)
            }
        })
    }

    function displayAlert(alertText: string) {
        clearTimeout(alertTimeOut)
        setAlert(alertText)
        const timeout = setTimeout(()=> {
            setAlert(undefined)
        }, 5000)
        setAlertTimeOut(timeout)
        return;
    }


    function loadRegister() {
        changePage(Page.REGISTER)
    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className="login-box">
                <div className="login-box-elements">
                    <div>
                        <Input className="Input" startDecorator={<img src={Mail}/>} placeholder="Email" name="email"/>
                    </div>
                    <div>
                        <Input className="Input" startDecorator={<img src={Lock} />} endDecorator={<button className="classic-btn"><img src={Eye}/></button>} placeholder="Password" name="password"/>
                    </div>
                    <div className="full-center">
                        <button className="login-btn btn" type="submit">Login</button>
                    </div>
                    <div className="full-center">
                        <button className="register-btn btn" onClick={loadRegister} type="button">Register</button>
                    </div>
                    {alert && <Alert color={"danger"}>{alert}</Alert>}
                </div>
            </form>
        </>
    )


    async function login(email: string, password: string) {
        return await singleFetch<LoginResponse>('/api/auth/login', Methods.POST, {email: email, password: password})
    }
}

export default LoginPage
