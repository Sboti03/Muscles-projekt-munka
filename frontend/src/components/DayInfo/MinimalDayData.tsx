import FoodDayInfo from "./FoodDayInfo/FoodDayInfo";
import DayPeriodInfo from "./DayPeriodInfo/DayPeriodInfo";
import React, {useContext, useState} from "react";
import WeightInfo from "./WeightInfo/WeightInfo";
import DayInfoContext from "./context/DayInfoContext";
import Comment from "./Comment/Comment";
import UserCoachContext from "../UserCoach/context/UserCoachContext";



export default function MinimalDayData() {
    const {currentDate, dayInfo} = useContext(DayInfoContext)
    const {connections} = useContext(UserCoachContext)

    return (
        <>
            <div className="full-center">
                <FoodDayInfo dayInfo={dayInfo}/>
            </div>
            <div>
                <DayPeriodInfo/>
            </div>
            <div>
                <WeightInfo weight={dayInfo?.weight ? dayInfo.weight : 0} currentDate={currentDate}/>
            </div>
            {
                connections && connections.find(value => value.accessAll) && <div>
                    <Comment />
                </div>
            }
        </>
    )
}