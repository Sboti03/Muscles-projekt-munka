import './DayPeriodInfo.css'
import {useContext, useEffect, useState} from "react";
import dayPeriodInfoFetch, {DayPeriodInfoFetchResponse, DayPeriodName} from "./DayPeriodInfoFetch";
import DayInfoContext from "../DayInfoContext";
import {getMinimalInfo} from "../Data/DayPeriodResponse";

export default function DayPeriodInfo() {
    const {currentDate, dayInfo} = useContext(DayInfoContext)
    const [breakfastCalories, setBreakfastCalories] = useState(0)
    const [lunchCalories, setLunchCalories] = useState(0)
    const [dinnerCalories, setDinnerCalories] = useState(0)
    const [otherCalories, setOtherCalories] = useState(0)

    useEffect(() => {
        setDayPeriodInfo(currentDate)

    }, [currentDate])

    function loadPage(type: DayPeriodName) {
        switch (type) {
            case DayPeriodName.BREAKFAST:
                break;
            case DayPeriodName.LUNCH:
                break;
            case DayPeriodName.DINNER:
                break;
            case DayPeriodName.OTHER:
                break;
        }
    }

    return (
        <div className="dpi">
            <div onClick={()=> loadPage(DayPeriodName.BREAKFAST)} className="dpi-container">
                <div>Breakfast</div>
                <div>{breakfastCalories}kcal</div>
            </div>

            <div onClick={()=> loadPage(DayPeriodName.LUNCH)} className="dpi-container">
                <div>Lunch</div>
                <div>{lunchCalories}kcal</div>
            </div>

            <div onClick={()=> loadPage(DayPeriodName.DINNER)} className="dpi-container">
                <div>Dinner</div>
                <div>{dinnerCalories}kcal</div>
            </div>

            <div onClick={()=> loadPage(DayPeriodName.OTHER)} className="dpi-container">
                <div>Other</div>
                <div>{otherCalories}kcal</div>
            </div>
        </div>
    )


    async function setDayPeriodInfo(currentDate: Date) {

        const breakfast = await dayPeriodInfoFetch(currentDate, DayPeriodName.BREAKFAST)
        setBreakfastCalories(await getDayPeriodInfo(breakfast))

        const lunch = await dayPeriodInfoFetch(currentDate, DayPeriodName.LUNCH)
        setLunchCalories(await getDayPeriodInfo(lunch))

        const dinner = await dayPeriodInfoFetch(currentDate, DayPeriodName.DINNER)
        setDinnerCalories(await getDayPeriodInfo(dinner))

        const other = await dayPeriodInfoFetch(currentDate, DayPeriodName.OTHER)
        setOtherCalories(await getDayPeriodInfo(other))
    }

    async function getDayPeriodInfo(fetchResponse: DayPeriodInfoFetchResponse) {
        if (fetchResponse.response) {
            return getMinimalInfo(fetchResponse.response)
        } else {
            return 0
        }
    }
}




