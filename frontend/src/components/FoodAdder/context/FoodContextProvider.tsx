import FoodContext from "./FoodContext";
import {PropsWithChildren, useContext, useState} from "react";
import {Food} from "../FoodSearchPage";
import {Methods, singleFetch} from "../../utils/Fetch";
import {normalizeDate} from "../../DayInfo/context/DayInfoContextProvider";
import DayInfoContext from "../../DayInfo/context/DayInfoContext";
import UserCoachContext from "../../UserCoach/context/UserCoachContext";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";

export default function FoodContextProvider(props: PropsWithChildren) {
    const [currentDate, setCurrentDate] = useState<Date | undefined>()
    const [currentFood, setCurrentFood] = useState<Food>()
    const [periodName, setPeriodName] = useState<string>()
    const [loadingFoodAdd, setLoadingFoodAdd] = useState(false)
    const {showProfileId} = useContext(UserCoachContext)
    const {page} = useContext(NavigatorContext)

    async function addFood(amount: number, foodId?: number, isCompleted?: boolean) {
        let userId = undefined
        if (page === Page.COACH_HOME) {
            userId = showProfileId
        }
        setLoadingFoodAdd(true)
        const res = await singleFetch(`/api/meal-history/create`, Methods.POST, {
            periodName: periodName,
            userId,
            date: normalizeDate(currentDate),
            foodId: foodId ? foodId : currentFood?.foodId,
            amount,
            isCompleted,
        })
        if (res.response) {
            setLoadingFoodAdd(false)
        }
    }
    return (
        <FoodContext.Provider value={{
            currentDate,
            addFood,
            loadingFoodAdd,
            periodName,
            setPeriodName,
            setCurrentDate,
            currentFood,
             setCurrentFood,
        }}>{props.children}</FoodContext.Provider>
    )
}