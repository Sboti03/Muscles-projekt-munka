import FoodDayInfo from "./FoodDayInfo/FoodDayInfo";
import DayPeriodInfo from "./DayPeriodInfo/DayPeriodInfo";
import React, {useContext, useState} from "react";
import WeightInfo from "./WeightInfo/WeightInfo";
import DayInfoContext from "./DayInfoContext";



export default function MinimalDayData() {

    const {currentDate, dayInfo} = useContext(DayInfoContext)


    return (
        <>
            <div className="full-center">
                <FoodDayInfo/>
            </div>
            <div>
                <DayPeriodInfo/>
            </div>
            <div>
                <WeightInfo weight={dayInfo?.weight ? dayInfo.weight : 0} currentDate={currentDate}/>
            </div>
        </>
    )
}