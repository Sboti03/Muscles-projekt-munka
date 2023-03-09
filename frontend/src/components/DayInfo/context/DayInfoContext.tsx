import React from "react";
import {MealHistoryResponse} from "../Data/MealHistoryResponse";
import {DayInfoData} from "../Data/DayInfoData";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";

export interface DayContextValue {
    dayInfo: DayInfoData | undefined,
    currentDate: Date,
    setCurrentDate: (date: Date) => void,
    dayPeriodInfo: DayPeriodResponse | undefined,
    setDayPeriodInfo: (dayPeriodResponse: DayPeriodResponse) => void
    mealHistoryResponse: MealHistoryResponse | undefined
    setNewDayInfo: ()=> void
}


const DayInfoContext = React.createContext<DayContextValue>(null as any)


export default DayInfoContext