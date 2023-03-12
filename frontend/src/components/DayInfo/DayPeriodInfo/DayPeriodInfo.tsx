import './DayPeriodInfo.css'
import {useContext, useEffect, useState} from "react";
import dayPeriodInfoFetch, {DayPeriodInfoFetchResponse, DayPeriodName} from "./DayPeriodInfoFetch";
import DayInfoContext from "../DayInfoContext";
import {getMinimalInfo} from "../Data/DayPeriodResponse";
import DayPeriodInfoContainer from "./DayPeriodInfoContainer";
import DayPeriodContext from "./DayPeriodContext";

export default function DayPeriodInfo() {

    const {currentDate, dayInfo} = useContext(DayInfoContext)
    const {setBreakfast, setLunch, setDinner, setOther, setSelectedPeriodInfo} = useContext(DayPeriodContext)
    const [breakfastCalories, setBreakfastCalories] = useState(0)
    const [lunchCalories, setLunchCalories] = useState(0)
    const [dinnerCalories, setDinnerCalories] = useState(0)
    const [otherCalories, setOtherCalories] = useState(0)

    useEffect(() => {
        setDayPeriodInfo(currentDate)

    }, [currentDate])


    return (
        <div className="dpi">
            <button onClick={()=> setSelectedPeriodInfo(DayPeriodName.BREAKFAST)} className="dpi-container">
                <DayPeriodInfoContainer totalCalories={breakfastCalories} eatenCalories={dayInfo?.totalBreakfast} name="Breakfast"/>
            </button>

            <button onClick={()=> setSelectedPeriodInfo(DayPeriodName.LUNCH)} className="dpi-container">
                <DayPeriodInfoContainer totalCalories={lunchCalories} eatenCalories={dayInfo?.totalLunch} name="Lunch"/>
            </button>

            <button onClick={()=> setSelectedPeriodInfo(DayPeriodName.DINNER)} className="dpi-container">
                <DayPeriodInfoContainer totalCalories={dinnerCalories} eatenCalories={dayInfo?.totalDinner} name="Dinner"/>
            </button>

            <button onClick={()=> setSelectedPeriodInfo(DayPeriodName.OTHER)} className="dpi-container">
                <DayPeriodInfoContainer totalCalories={otherCalories} eatenCalories={dayInfo?.totalOther} name="Other"/>
            </button>
        </div>
    )


    async function setDayPeriodInfo(currentDate: Date) {

        const breakfast = await dayPeriodInfoFetch(currentDate, DayPeriodName.BREAKFAST)
        setBreakfastCalories(await getDayPeriodInfo(breakfast))
        if (breakfast.response) {
            setBreakfast(breakfast.response)
        }

        const lunch = await dayPeriodInfoFetch(currentDate, DayPeriodName.LUNCH)
        setLunchCalories(await getDayPeriodInfo(lunch))
        if (lunch.response) {
            setLunch(lunch.response)
        }

        const dinner = await dayPeriodInfoFetch(currentDate, DayPeriodName.DINNER)
        setDinnerCalories(await getDayPeriodInfo(dinner))
        if (dinner.response) {
            setDinner(dinner.response)
        }

        const other = await dayPeriodInfoFetch(currentDate, DayPeriodName.OTHER)
        setOtherCalories(await getDayPeriodInfo(other))
        if (other.response) {
            setOther(other.response)
        }

    }

    async function getDayPeriodInfo(fetchResponse: DayPeriodInfoFetchResponse) {
        if (fetchResponse.response) {
            return getMinimalInfo(fetchResponse.response)
        } else {
            return 0
        }
    }
}




