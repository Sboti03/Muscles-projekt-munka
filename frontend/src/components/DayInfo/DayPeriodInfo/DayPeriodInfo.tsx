import './DayPeriodInfo.css'
import {useContext, useEffect, useState} from "react";
import {DayPeriodName} from "./DayPeriodInfoFetch";
import DayInfoContext from "../DayInfoContext";
import {DayPeriodResponse, getMinimalInfo} from "../Data/DayPeriodResponse";
import DayPeriodInfoContainer from "./DayPeriodInfoContainer";
import DayPeriodContext from "./context/DayPeriodContext";
import DayInfoNavigatorContext, {DayInfoPages} from "../Navigator/Context/DayInfoNavigatorContext";

export default function DayPeriodInfo() {

    const {currentDate, dayInfo} = useContext(DayInfoContext)
    const {setSelectedPeriodInfo, dinner, lunch, breakfast, other} = useContext(DayPeriodContext)
    const {changeDayInfoPage} = useContext(DayInfoNavigatorContext)
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


    function showPeriodInfoPage(dayPeriodName: DayPeriodName) {
        setSelectedPeriodInfo(dayPeriodName)
        changeDayInfoPage(DayInfoPages.PERIOD_INFO_DATA)
    }

    return (
        <div className="dpi">
            <button onClick={()=> showPeriodInfoPage(DayPeriodName.BREAKFAST)} className="dpi-container">
                <DayPeriodInfoContainer totalCalories={breakfastCalories} eatenCalories={dayInfo?.totalBreakfast} name="Breakfast"/>
            </button>

            <button onClick={()=> showPeriodInfoPage(DayPeriodName.LUNCH)} className="dpi-container">
                <DayPeriodInfoContainer totalCalories={lunchCalories} eatenCalories={dayInfo?.totalLunch} name="Lunch"/>
            </button>

            <button onClick={()=> showPeriodInfoPage(DayPeriodName.DINNER)} className="dpi-container">
                <DayPeriodInfoContainer totalCalories={dinnerCalories} eatenCalories={dayInfo?.totalDinner} name="Dinner"/>
            </button>

            <button onClick={()=> showPeriodInfoPage(DayPeriodName.OTHER)} className="dpi-container">
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




