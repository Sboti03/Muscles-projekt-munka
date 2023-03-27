import DayInfoContext from "./DayInfoContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {Methods, singleFetch} from "../utils/Fetch";
import {MealHistoryResponse} from "./Data/MealHistoryResponse";
import {DayInfoData} from "./Data/DayInfoData";
import {DayPeriodResponse} from "./Data/DayPeriodResponse";
import {calculateDayInfoData} from "./CalculateDayInfoData";

export default function DayInfoContextProvider(props: PropsWithChildren) {
    const [dayInfo, setDayInfo] = useState<DayInfoData | undefined>()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [dayPeriodInfo, setDayPeriodInfo] = useState<DayPeriodResponse>()

    useEffect(() => {
        fetchDay(currentDate)
    }, [currentDate])

    async function fetchDay(date: Date) {
        const result = await singleFetch<MealHistoryResponse>(`/api/meal-history/data/?date=${normalizeDate(date)}`, Methods.GET)
        if (result.error) {
            // TODO Handle error
        } else if (result.response) {
            const {response} = result
            setDayInfo(calculateDayInfoData(response))
        } else {
            // TODO handle unknown error
        }
    }

    return (
        <DayInfoContext.Provider value={{fetchDay, dayInfo, currentDate, setCurrentDate, setDayPeriodInfo, dayPeriodInfo}}>
            {props.children}
        </DayInfoContext.Provider>
    )
}


export function normalizeDate(date?: Date) {
    if (date) {
        return date.toISOString().split('T')[0]
    }
}

