import {PropsWithChildren, useState} from "react";
import DayInfoNavigatorContext, {DayInfoPages} from "./DayInfoNavigatorContext";
import {DayPeriodResponse} from "../../Data/DayPeriodResponse";

export default function DayInfoNavigatorContextProvider(props: PropsWithChildren) {

    const [dayInfoPage, setDayInfoPage] = useState(DayInfoPages.MINIMAL_DATA)
    const [foodEditMeal, setFoodEditMeal] = useState<DayPeriodResponse>()


    function loadFoodEdit(dayPeriodResponse:DayPeriodResponse) {
        setFoodEditMeal(dayPeriodResponse)
        setDayInfoPage(DayInfoPages.MEAL_HISTORY_EDIT)
    }

    return (
        <DayInfoNavigatorContext.Provider value={{
            loadFoodEdit,
            foodEditMeal,
            changeDayInfoPage: setDayInfoPage,
            dayInfoPage
        }}>{props.children}</DayInfoNavigatorContext.Provider>
    )
}