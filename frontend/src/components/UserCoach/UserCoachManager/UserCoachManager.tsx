import React, {useContext} from "react";
import UserCoachContext from "../context/UserCoachContext";
import DayPage from "../../DayInfo/DayPage";
import {Button} from "@mui/joy";
import UserCoachNavigatorContext, {UserCoachPages} from "../navigator/UserCoachNavigatorContext";
import DayInfoNavbar from "../../DayInfo/DayInfoNavbar";
import DayPickerBar from "../../DayInfo/DayPicker/DayPickerBar";
import {RoleEnum} from "../../Types/Role";
import {Page} from "../../Navigator/NavigatorContext";

export default function UserCoachManager() {

    const {changePage, userCoachPage} = useContext(UserCoachNavigatorContext)

    function handleBackClick() {
        changePage(UserCoachPages.BASE)
    }

    return (
        <>
            <div className={"m-3"}>
                <Button onClick={handleBackClick}>Home</Button>
            </div>
            <DayPage/>

        </>
    )
}