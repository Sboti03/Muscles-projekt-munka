import './DayPeriodInfo.css'
import {useContext, useEffect, useState} from "react";
import dayPeriodInfoFetch, {DayPeriodName} from "./DayPeriodInfoFetch";
import DayInfoContext from "../DayInfoContext";
import {getMinimalInfo} from "../Data/DayPeriodResponse";

export default function DayPeriodInfo() {
    const {currentDate} = useContext(DayInfoContext)
    const [totalCalorie, setTotalCalorie] = useState(0)
    useEffect(() => {
        setDayPeriodInfo(currentDate, DayPeriodName.BREAKFAST)

    }, [currentDate])

    return (
        <div className="dpi-container">
            <div>
                <div>{DayPeriodName.BREAKFAST}</div>
                <div>{totalCalorie}kcal</div>
            </div>
        </div>
    )


    async function setDayPeriodInfo(currentDate: Date, dayPeriodName: DayPeriodName) {
        const result = await dayPeriodInfoFetch(currentDate, dayPeriodName)
        if (result.response) {
            setTotalCalorie(getMinimalInfo(result.response))
        } else {

        }
    }

}




