import React, {useContext} from "react";
import UserCoachContext from "../context/UserCoachContext";
import DayPage from "../../DayInfo/DayPage";
import {Button} from "@mui/joy";
import UserCoachNavigatorContext, {UserCoachPages} from "../navigator/UserCoachNavigatorContext";

export default function UserCoachManager() {

    const {showProfileId} = useContext(UserCoachContext)
    const {changePage, userCoachPage} = useContext(UserCoachNavigatorContext)

    function handleBackClick() {
        changePage(UserCoachPages.BASE)
    }

    return (
        <>
            <div className={"m-3"}>
                <Button onClick={handleBackClick}>Home</Button>
            </div>
            <DayPage profileId={showProfileId}/>
        </>
    )
}