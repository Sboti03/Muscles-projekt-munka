import {PropsWithChildren, useState} from "react";
import NavigatorContext, {Page} from "./NavigatorContext";
import LoginPage from "../Auth/Login/LoginPage";

export default function NavigatorContextProvider(props:PropsWithChildren) {

    const [page, setPage] = useState(Page.LOGIN)
    return (
        <NavigatorContext.Provider value={{page, changePage: setPage}}>
            {props.children}
        </NavigatorContext.Provider>
    )
}
