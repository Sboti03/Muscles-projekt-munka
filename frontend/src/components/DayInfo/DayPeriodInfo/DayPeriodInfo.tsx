import './DayPeriodInfo.css'
import {useContext, useEffect, useState} from "react";
import dayPeriodInfoFetch, {DayPeriodInfoFetchResponse, DayPeriodName} from "./DayPeriodInfoFetch";
import DayInfoContext from "../DayInfoContext";
import {DayPeriodResponse, getMinimalInfo} from "../Data/DayPeriodResponse";
import DayPeriodInfoContainer from "./DayPeriodInfoContainer";
import DayPeriodContext from "./DayPeriodContext";

export default function DayPeriodInfo() {

    const {currentDate, dayInfo} = useContext(DayInfoContext)
    const {setSelectedPeriodInfo, dinner, lunch, breakfast, other} = useContext(DayPeriodContext)
    const [breakfastCalories, setBreakfastCalories] = useState(0)
    const [lunchCalories, setLunchCalories] = useState(0)
    const [dinnerCalories, setDinnerCalories] = useState(0)
    const [otherCalories, setOtherCalories] = useState(0)

    useEffect(() => {
        const setter = async ()=> {
            setBreakfastCalories(await getDayPeriodInfo(breakfast))
            setLunchCalories(await getDayPeriodInfo(lunch))
            setDinnerCalories(await getDayPeriodInfo(dinner))
            setOtherCalories(await getDayPeriodInfo(other))
        }
        setter()
    }, [currentDate, breakfast, other, lunch, dinner])


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

    async function getDayPeriodInfo(dayPeriodResponse: DayPeriodResponse[] | undefined) {
        if (dayPeriodResponse) {
            return getMinimalInfo(dayPeriodResponse)
        } else {
            return 0
        }
    }
}




