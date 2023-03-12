import FoodDayInfo from "./FoodDayInfo/FoodDayInfo";
import DayPeriodInfo from "./DayPeriodInfo/DayPeriodInfo";
import React from "react";

export default function MinimalDayData() {
    return (
        <>
            <div className="full-center">
                <FoodDayInfo/>
            </div>
            <div>
                <DayPeriodInfo/>
            </div>
        </>
    )
}