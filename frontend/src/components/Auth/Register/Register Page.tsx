import {Alert, Button, CircularProgress, Input} from "@mui/joy";
import Mail from "../../../assets/SVG/mail.svg";
import Lock from "../../../assets/SVG/Lock.svg";
import Eye from "../../../assets/SVG/eye.svg";
import {FormEvent, useContext, useState} from "react";
import SwitchSelector from "react-switch-selector";
import {OptionType} from "react-switch-selector/dist/SwitchSelector.props";
import './Register.css'
import {RegisterData} from "./RegisterData";
import AuthContext from "../AuthContext";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export default function RegisterPage() {
    const {register, setUser} = useContext(AuthContext)
    const {changePage} = useContext(NavigatorContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isCoach, setIsCoach] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isRePasswordVisible, setReIsPasswordVisible] = useState(false)
    const {t} = useTranslation()

    const handleRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let email = ""
        let password = ""
        let passwordAgain = ""
        for (let i = 0; i < event.currentTarget.length; i++) {
            const input = event.currentTarget[i] as HTMLInputElement
            switch (input.name) {
                case "email":
                    email = input.value;
                    break;
                case 'password':
                    password = input.value;
                    break;
                case "passwordAgain":
                    passwordAgain = input.value;
                    break;
            }
        }
        if (password !== passwordAgain) {
            toast.error(t('register.error.password.match'))
            return;
        }
        const registerData: RegisterData = {email, password, isCoach}
        handleRegisterResponse(registerData)
    }



    async function handleRegisterResponse(registerData: RegisterData) {
        const result = await register(registerData)

        if (result.response) {
            changePage(Page.PROFILE_CREATE)
        } else {
            setIsLoading(false)
            switch (result.error.statusCode) {
                case 403:
                    toast.error(t("register.error.exist"));
                    break;
                case 400:
                    toast.error(t("register.error.input"));
                    break;
            }
        }
    }

    function loadLogin() {
        changePage(Page.LOGIN)
    }

    function changePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState);
    }

    function changeRePasswordVisibility() {
        setReIsPasswordVisible(prevState => !prevState)
    }

    return (
        <form onSubmit={handleRegister} className="login-box welcome-bg">
            <div className="login-box-elements">
               <div className="switch-selector">
                   <SwitchSelector disabled={isLoading} onChange={selectedOptionValue => setIsCoach(selectedOptionValue as boolean)} options={NormalCoachOption} />
               </div>
                <div>
                    <Input disabled={isLoading} required type="email" className="Input" startDecorator={<img src={Mail}/>} placeholder="Email" name="email"/>
                </div>
                <div>
                    <Input disabled={isLoading} required type={`${isPasswordVisible ? "text" : "password"}`} className="Input" startDecorator={<img src={Lock} />} endDecorator={<button type="button" onClick={changePasswordVisibility} className="classic-btn"><img src={Eye}/></button>} placeholder="Password" name="password"/>
                </div>
                <div>
                    <Input disabled={isLoading} required type={`${isRePasswordVisible ? "text" : "password"}`} className="Input" startDecorator={<img src={Lock} />} endDecorator={<button type="button" onClick={changeRePasswordVisibility} className="classic-btn"><img src={Eye}/></button>} placeholder="Password again" name="passwordAgain"/>
                </div>
                <div className="flex justify-center">
                    <Button disabled={isLoading} className="w-1/2" type="submit">Register</Button>
                </div>
                <div className="flex justify-center">
                    <Button disabled={isLoading} className="w-1/3" onClick={loadLogin} type="button">Login</Button>
                </div>
                <div className="full-center">
                    {isLoading && <CircularProgress />}
                </div>
            </div>
        </form>
    )
}

const NormalCoachOption: OptionType[] = [
    {value: false, label: "Normal", fontColor: 'black', selectedFontColor:'white', selectedBackgroundColor: '#6F00B3'},
    {value: true, label: "Coach", selectedBackgroundColor: '#6F00B3'}
]