import {Input} from "@mui/joy";
import Lock from "../../assets/SVG/Lock.svg";
import Eye from "../../assets/SVG/eye.svg";
import {useState} from "react";

export default function PasswordInput(props: Props) {
    const {value, onChange, isLoading, name, placeHolder} = props
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)


    function changePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState)
    }

    if (value) {
        return <Input value={value} onChange={event => onChange ? onChange(event.target.value) : {}} disabled={isLoading !== undefined ? isLoading : false} required type={`${isPasswordVisible ? "text" : "password"}`} className="Input" startDecorator={<img src={Lock} />} endDecorator={<button type="button" onClick={changePasswordVisibility} className="classic-btn"><img src={Eye}/></button>} placeholder={placeHolder} name={name}/>
    }

    return (
        <>
            <Input onChange={event => onChange ? onChange(event.target.value) : {}} disabled={isLoading !== undefined ? isLoading : false} required type={`${isPasswordVisible ? "text" : "password"}`} className="Input" startDecorator={<img src={Lock} />} endDecorator={<button type="button" onClick={changePasswordVisibility} className="classic-btn"><img src={Eye}/></button>} placeholder={placeHolder} name={name}/>
        </>
    )
}


interface Props{
    value?: string;
    isLoading?: boolean
    name: string
    placeHolder: string
    onChange?: (value: string | undefined) => void

}