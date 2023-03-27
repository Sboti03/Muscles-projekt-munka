import {PropsWithChildren, useContext, useEffect, useState} from "react";
import DayPeriodContext from "./DayPeriodContext";
import dayPeriodInfoFetch, {DayPeriodName} from "../DayPeriodInfoFetch";
import {DayPeriodResponse} from "../../Data/DayPeriodResponse";
import {Methods, singleFetch} from "../../../utils/Fetch";
import {MealHistoryResponse} from "../../Data/MealHistoryResponse";
import DayInfoContext from "../../DayInfoContext";
import DayInfoNavigatorContext from "../../Navigator/Context/DayInfoNavigatorContext";

export default function DayPeriodInfoContextProvider(props: PropsWithChildren) {

    const [breakfast, setBreakfast] = useState<DayPeriodResponse[]>()
    const [dinner, setDinner] = useState<DayPeriodResponse[]>()
    const [lunch, setLunch] = useState<DayPeriodResponse[]>()
    const [other, setOther] = useState<DayPeriodResponse[]>()
    const [selectedPeriodInfo, setSelectedPeriodInfo] = useState<DayPeriodName | undefined>(undefined)
    const {currentDate} = useContext(DayInfoContext)
    async function setMealCompleted(completed: boolean, mealHistoryId: number) {
        const {error, response} = await singleFetch('api/meal-history/update', Methods.PATCH,
            {mealHistoryId: mealHistoryId, isCompleted: completed}
        )
        if (error) {
            console.log(mealHistoryId)
        } else {
            setDayPeriods()
        }
    }

    async function deleteMealHistory(mealHistoryId: number) {
        const url = 'api/meal-history/' + mealHistoryId
        const {error, response} = await singleFetch(url, Methods.DELETE)
        if (error) {
            // TODO handle error
        } else {
            setDayPeriods()
        }
    }

    async function setDayPeriods() {
        const breakfast = await dayPeriodInfoFetch(currentDate, DayPeriodName.BREAKFAST)
        if (breakfast.response) {
            setBreakfast(breakfast.response)
        }
        const lunch = await dayPeriodInfoFetch(currentDate, DayPeriodName.LUNCH)
        if (lunch.response) {
            setLunch(lunch.response)
        }
        const dinner = await dayPeriodInfoFetch(currentDate, DayPeriodName.DINNER)
        if (dinner.response) {
            setDinner(dinner.response)
        }
        const other = await dayPeriodInfoFetch(currentDate, DayPeriodName.OTHER)
        if (other.response) {
            setOther(other.response)
        }
    }
    useEffect(()=> {
        setDayPeriods()
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

