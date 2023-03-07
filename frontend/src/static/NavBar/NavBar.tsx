import './NavBar.css'
import {useContext} from "react";
import NavigatorContext, {Page} from "../../components/Navigator/NavigatorContext";
import AuthContext from "../../components/Auth/AuthContext";
import {Methods, singleFetch} from "../../components/utils/Fetch";

export default function NavBar() {

    const {changePage} = useContext(NavigatorContext)
    const {user, setUser, login, logout} = useContext(AuthContext)



    const logoutElement = <div><button onClick={logout}>Logout</button></div>
    const logInElement = <div><button onClick={login}>Login</button></div>

    return (
        <nav className="nav">
            {user ? logoutElement : logInElement}
        </nav>
    )
}