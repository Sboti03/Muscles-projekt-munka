import './DayPeriodInfo.css'
import {useContext, useEffect} from "react";
import dayPeriodInfoFetch from "./DayPeriodInfoFetch";
import DayInfoContext from "../DayInfoContext";
export default function DayPeriodInfo() {
    const {currentDate} = useContext(DayInfoContext)
    useEffect(()=> {
        dayPeriodInfoFetch(currentDate, dayPeriodName.BREAKFAST)
    }, [])
    return (
        <div className="dpi-container">
            <div>{dayPeriodName.BREAKFAST}</div>
            <div></div>
        </div>
    )
}


export enum dayPeriodName {
    BREAKFAST= 'Breakfast',
    DINNER = 'Dinner',
    LUNCH = 'Lunch',
    OTHER = 'Other'
}