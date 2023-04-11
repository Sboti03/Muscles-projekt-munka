import DayInfoContext from "./DayInfoContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {Methods, singleFetch} from "../../utils/Fetch";
import {MealHistoryResponse} from "../Data/MealHistoryResponse";
import {DayInfoData} from "../Data/DayInfoData";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";
import {calculateDayInfoData} from "../CalculateDayInfoData";

export default function DayInfoContextProvider(props: PropsWithChildren<{profileId?: number}>) {
    const [dayInfo, setDayInfo] = useState<DayInfoData | undefined>()
    const [currentDate, setCurrentDate] = useState(new Date())
    const {profileId} = props
    const [dayPeriodInfo, setDayPeriodInfo] = useState<DayPeriodResponse>()
    const [mealHistoryResponse, setMealHistoryResponse] = useState<MealHistoryResponse>()

    useEffect(()=> {
        fetchDay(currentDate).then(r => {
            setMealHistoryResponse(r)
        })
    }, [currentDate])

    function setNewDayInfo() {
        fetchDay(currentDate).then(r => {
            setMealHistoryResponse(r)
        })
    }

    async function fetchDay(date: Date) {
        const path = `/api/meal-history/data/?date=${normalizeDate(date)}${profileId ? '&userId=' + profileId : ''}`
        const result = await singleFetch<MealHistoryResponse>(path, Methods.GET)
        if (result.error) {
            //TODO handle errror

        } else if (result.response) {
           return result.response
        }
    }
    useEffect(()=> {
        if (mealHistoryResponse) {
            setDayInfo(calculateDayInfoData(mealHistoryResponse))
        }
    }, [mealHistoryResponse])

    return (
        <DayInfoContext.Provider value={{
            setNewDayInfo,
            dayInfo,
            currentDate,
            setCurrentDate,
            setDayPeriodInfo,
            dayPeriodInfo,
            mealHistoryResponse,
        }}>{props.children}</DayInfoContext.Provider>
    )
}


export function normalizeDate(date?: Date) {
    if (date) {
        return date.toISOString().split('T')[0]
    }
}

