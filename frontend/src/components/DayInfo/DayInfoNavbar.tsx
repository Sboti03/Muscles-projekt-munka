import React, {useContext} from "react";
import ProfileBar from "../ProfileBar/ProfileBar";
import DayPickerBar from "./DayPicker/DayPickerBar";
import AuthContext from "../Auth/AuthContext";
import {RoleEnum} from "../Types/Role";

export default function DayInfoNavbar() {

    const {user} = useContext(AuthContext)
    if (user!.role.roleName === RoleEnum.COACH) {
        return (
            <>
                <div className="day-picker-coach"><DayPickerBar /></div>
            </>
        )
    }

    return (
        <>
            <div className="day-info-nav">
                <div><ProfileBar/></div>
                <div className="day-picker"><DayPickerBar/></div>
                <div></div>
            </div>
        </>
    )
}