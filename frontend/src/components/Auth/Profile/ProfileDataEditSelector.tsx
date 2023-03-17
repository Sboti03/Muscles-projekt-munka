import {Button} from "@mui/joy";
import React, {useContext} from "react";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import AuthContextProvider from "../AuthContextProvider";
import AuthContext from "../AuthContext";

export default function ProfileDataEditSelector() {
    const {changePage, setPrevPage} = useContext(NavigatorContext)
    const {logout} = useContext(AuthContext)

    return (
        <>
            <Button type="button" onClick={setPrevPage}>Back</Button>
            <div><Button onClick={()=> changePage(Page.PROFILE_DATA)}>Personal information</Button></div>
            <div><Button onClick={()=> changePage(Page.GOALS)}>Goals</Button></div>
            <div><Button onClick={()=> changePage(Page.RESULTS)}>Results</Button></div>
            <div><Button color="danger" onClick={logout}>Logout</Button></div>
        </>
    )
}