import React from "react";
import {MealHistoryResponse} from "./Data/MealHistoryResponse";
import {DayInfoData} from "./Data/DayInfoData";

export interface DayContextValue {
    fetchDay: (date: Date) => void,
    dayInfo: DayInfoData | undefined,
    currentDate: Date,
    setCurrentDate: (date: Date) => void
}


const DayInfoContext = React.createContext<DayContextValue>(null as any)


export default DayInfoContext