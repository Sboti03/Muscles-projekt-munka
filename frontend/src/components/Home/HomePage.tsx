import {useContext} from "react";
import AuthContext from "../Auth/AuthContext";

export default function HomePage() {
    const {user} = useContext(AuthContext)
    
    return (
        <>

        </>
    )
}