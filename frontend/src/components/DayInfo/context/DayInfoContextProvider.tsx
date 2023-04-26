import DayInfoContext from "./DayInfoContext";
import {PropsWithChildren, useContext, useEffect, useState} from "react";
import {Methods, singleFetch} from "../../utils/Fetch";
import {MealHistoryResponse} from "../Data/MealHistoryResponse";
import {DayInfoData} from "../Data/DayInfoData";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";
import {calculateDayInfoData} from "../CalculateDayInfoData";
import UserCoachContext from "../../UserCoach/context/UserCoachContext";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";

export default function DayInfoContextProvider(props: PropsWithChildren) {
    const {showProfileId} = useContext(UserCoachContext)
    const [dayInfo, setDayInfo] = useState<DayInfoData | undefined>()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [dayPeriodInfo, setDayPeriodInfo] = useState<DayPeriodResponse>()
    const [mealHistoryResponse, setMealHistoryResponse] = useState<MealHistoryResponse>()
    const {page} = useContext(NavigatorContext)
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
        let userId = undefined
        if (page === Page.COACH_HOME) {
            userId = showProfileId
        }
        const path = `/api/meal-history/data/?date=${normalizeDate(date)}${userId ? '&userId=' + userId : ''}`
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

