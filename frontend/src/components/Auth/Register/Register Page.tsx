import {Alert, CircularProgress, Input} from "@mui/joy";
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

export default function RegisterPage() {

    const {register, setUser} = useContext(AuthContext)
    const {changePage} = useContext(NavigatorContext)
    const [alert, setAlert] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [isCoach, setIsCoach] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isRePasswordVisible, setReIsPasswordVisible] = useState(false)
    function displayAlert(alertText: string) {
        setAlert(alertText)
        setTimeout(()=> {
            setAlert(undefined)
        }, 5000)
        return;
    }

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
        
        console.log(password, passwordAgain)
        if (password !== passwordAgain) {
            displayAlert('Password not match')
            return;
        }
        const registerData: RegisterData = {email, password, isCoach}
        setIsLoading(true)
        handleRegisterResponse(registerData)
    }



    async function handleRegisterResponse(registerData: RegisterData) {
        const result = await register(registerData)
        if (result.response) {
            setUser(result.response.user)
            changePage(Page.PROFILE_CREATE)
        } else {
            setIsLoading(false)
            setAlert(result.error.message)
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
        <form onSubmit={handleRegister} className="login-box">
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
                <div className="full-center">
                    <button disabled={isLoading} className="login-btn btn" type="submit">Register</button>
                </div>
                <div className="full-center">
                    <button disabled={isLoading} className="register-btn btn" onClick={loadLogin} type="button">Login</button>
                </div>
                {alert && <Alert color={"danger"}>{alert}</Alert>}
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