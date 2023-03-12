import {createContext} from "react";
import {DayContextValue} from "../DayInfoContext";
import {DayPeriodInfoFetchResponse, DayPeriodName} from "./DayPeriodInfoFetch";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";


export interface DayPeriodContextValue {
    breakfast: DayPeriodResponse[] | undefined
    lunch: DayPeriodResponse[] | undefined
    dinner: DayPeriodResponse[] | undefined
    other: DayPeriodResponse[] | undefined
    setBreakfast: (dayPeriodInfo: DayPeriodResponse[]) => void
    setLunch: (dayPeriodInfo: DayPeriodResponse[]) => void
    setDinner: (dayPeriodInfo: DayPeriodResponse[]) => void
    setOther: (dayPeriodInfo: DayPeriodResponse[]) => void,
    selectedPeriodInfo: DayPeriodName | undefined,
    setSelectedPeriodInfo: (selectedDayInfo: DayPeriodName) => void,
    deleteMealHistory: (mealHistoryId: number) => any,
    setMealCompleted: (completed: boolean, mealHistoryId: number) => any
}


const DayPeriodContext = createContext<DayPeriodContextValue>(null as any)

export default DayPeriodContext