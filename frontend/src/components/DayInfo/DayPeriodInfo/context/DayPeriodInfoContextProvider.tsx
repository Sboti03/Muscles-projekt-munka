import {PropsWithChildren, useContext, useEffect, useState} from "react";
import DayPeriodContext from "./DayPeriodContext";
import dayPeriodInfoFetch, {DayPeriodName} from "../DayPeriodInfoFetch";
import {DayPeriodResponse} from "../../Data/DayPeriodResponse";
import {Methods, singleFetch} from "../../../utils/Fetch";
import DayInfoContext from "../../context/DayInfoContext";
import UserCoachContext from "../../../UserCoach/context/UserCoachContext";
import NavigatorContext, {Page} from "../../../Navigator/NavigatorContext";

export default function DayPeriodInfoContextProvider(props: PropsWithChildren) {
    const [breakfast, setBreakfast] = useState<DayPeriodResponse[]>()
    const [dinner, setDinner] = useState<DayPeriodResponse[]>()
    const [lunch, setLunch] = useState<DayPeriodResponse[]>()
    const [other, setOther] = useState<DayPeriodResponse[]>()
    const [selectedPeriodInfo, setSelectedPeriodInfo] = useState<DayPeriodName | undefined>(undefined)
    const {showProfileId} = useContext(UserCoachContext)
    const {currentDate, setNewDayInfo} = useContext(DayInfoContext)
    const {page} = useContext(NavigatorContext)
    async function setMealCompleted(completed: boolean, mealHistoryId: number) {
        const {error} = await singleFetch('api/meal-history/update/' + mealHistoryId, Methods.PATCH,
            {isCompleted: completed}
        )
        if (error) {
            return false
        } else {
            await setDayPeriods()
            return true
        }
    }

    async function deleteMealHistory(mealHistoryId: number) {
        const url = `api/meal-history/${mealHistoryId}`
        const {error} = await singleFetch(url, Methods.DELETE)
        if (error) {
            return false
        } else {
            await setDayPeriods()
            return true
        }
    }

    async function setDayPeriods() {
        let userId = undefined
        if (page === Page.COACH_HOME) {
            userId = showProfileId
        }


        const breakfast = await dayPeriodInfoFetch(currentDate, DayPeriodName.BREAKFAST, userId)
        if (breakfast.response) {
            setBreakfast(breakfast.response)
        }
        const lunch = await dayPeriodInfoFetch(currentDate, DayPeriodName.LUNCH, userId)
        if (lunch.response) {
            setLunch(lunch.response)
        }
        const dinner = await dayPeriodInfoFetch(currentDate, DayPeriodName.DINNER, userId)
        if (dinner.response) {
            setDinner(dinner.response)
        }
        const other = await dayPeriodInfoFetch(currentDate, DayPeriodName.OTHER, userId)
        if (other.response) {
            setOther(other.response)
        }
        setNewDayInfo()
    }
    useEffect(()=> {
        setDayPeriods().then()
    }, [currentDate])

    return (
        <DayPeriodContext.Provider
            value={{
                setBreakfast,
                setDayPeriods,
                breakfast,
                deleteMealHistory,
                setMealCompleted,
                dinner,
                lunch,
                other,
                setDinner,
                setLunch,
                selectedPeriodInfo,
                setSelectedPeriodInfo,
                setOther,
            }}
        >{props.children}</DayPeriodContext.Provider>
    )
}

