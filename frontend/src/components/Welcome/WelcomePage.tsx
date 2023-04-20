import {Avatar, Button} from "@mui/joy";
import {useContext} from "react";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import './Welcome.css'
export default function WelcomePage() {
    const {changePage} = useContext(NavigatorContext)

    return (
        <div className="m-3 text-white welcome-bg">
            <nav className="md:gird md:grid-cols-3 md:justify-between text-center grid  justify-center">
                <div><img src={'/logo.svg'} className="w-12" /></div>
                <h1 className="font-bold text-4xl">Welcome Muscles 💪</h1>
                <div className="md:m-0 m-4 [&>button]:mx-2 [&>button]:h-10 md:flex md:justify-end">
                    <Button onClick={()=> changePage(Page.LOGIN)}>Login</Button>
                    <Button onClick={()=> changePage(Page.REGISTER)}>Register</Button>
                </div>
            </nav>

            <main>
                <div className="text-center">
                    Try it out now
                </div>
            </main>

        </div>
    )
}