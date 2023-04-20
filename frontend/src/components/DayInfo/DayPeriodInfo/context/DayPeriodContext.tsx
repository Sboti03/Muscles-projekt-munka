import {createContext} from "react";
import {DayPeriodName} from "../DayPeriodInfoFetch";
import {DayPeriodResponse} from "../../Data/DayPeriodResponse";


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
    setSelectedPeriodInfo: (selectedDayInfo: DayPeriodName | undefined) => void,
    deleteMealHistory: (mealHistoryId: number) => Promise<boolean>,
    setMealCompleted: (completed: boolean, mealHistoryId: number) => Promise<boolean>,
    setDayPeriods: () => Promise<void>
}


const DayPeriodContext = createContext<DayPeriodContextValue>(null as any)

export default DayPeriodContext