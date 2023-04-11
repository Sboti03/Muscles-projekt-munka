import {Button} from "@mui/joy";
import {useContext} from "react";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
export default function WelcomePage() {
    const {changePage} = useContext(NavigatorContext)

    return (
        <div className="m-3">
            <nav className="md:flex text-center grid md:justify-between justify-center">
                <div></div>

                <h1 className="font-bold text-4xl">Welcome Muscles 💪</h1>

                <div className="md:m-0 m-4 [&>button]:mx-2">
                    <Button onClick={()=> changePage(Page.LOGIN)}>Login</Button>
                    <Button onClick={()=> changePage(Page.REGISTER)}>Register</Button>
                </div>
            </nav>

            <main>
                <div>
                    Try it out now
                </div>
            </main>

        </div>
    )
}