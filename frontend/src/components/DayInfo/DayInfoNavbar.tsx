import FoodDayInfo from "./FoodDayInfo/FoodDayInfo";
import DayPeriodInfo from "./DayPeriodInfo/DayPeriodInfo";
import React from "react";
import ProfileBar from "./ProfileBar/ProfileBar";
import DayPickerBar from "./DayPicker/DayPickerBar";

export default function DayInfoNavbar() {
    return (
        <>
            <div className="day-info-nav">
                <div><ProfileBar/></div>
                <div className="day-picker"><DayPickerBar/></div>
                <div><ProfileBar/></div>
            </div>
        </>
    )
}