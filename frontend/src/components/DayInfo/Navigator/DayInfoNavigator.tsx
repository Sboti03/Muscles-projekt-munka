import React, {useContext, useState} from "react";
import DayPeriodContext from "../DayPeriodInfo/context/DayPeriodContext";
import MinimalDayData from "../MinimalDayData";
import PeriodInfoPage from "../PeriodInfo/PeriodInfoPage";
import DayInfoNavigatorContext, {DayInfoPages} from "./Context/DayInfoNavigatorContext";
import {FoodDetails} from "../../FoodAdder/FoodDetails/FoodDetails";
import {Methods, singleFetch} from "../../utils/Fetch";
import FoodSearchPage from "../../FoodAdder/FoodSearchPage";

export default function DayInfoNavigator() {
    const {changeDayInfoPage, dayInfoPage, foodEditMeal} = useContext(DayInfoNavigatorContext)
    const {selectedPeriodInfo, setDayPeriods} = useContext(DayPeriodContext)
    const [isLoading, setIsLoading] = useState(false)
    async function updateFood(amount: number) {
        if (foodEditMeal) {
            setIsLoading(true)
            const {response, error} = await singleFetch<{amount: number}>(`/api/meal-history/update/${foodEditMeal.mealHistoryId}`, Methods.PATCH, {amount})
            setDayPeriods().then(()=> setIsLoading(false))
        }
    }

    function handleCancel() {
        changeDayInfoPage(DayInfoPages.PERIOD_INFO_DATA)
    }

    switch (dayInfoPage) {
        case DayInfoPages.MEAL_HISTORY_EDIT:
            return <FoodDetails isLoading={isLoading} initValue={foodEditMeal!.meal.amount} food={foodEditMeal!.meal.food} action={updateFood} btnText={"Save"} cancel={handleCancel} />;
        case DayInfoPages.MINIMAL_DATA:
            return <MinimalDayData />
        case DayInfoPages.PERIOD_INFO_DATA:
            return <PeriodInfoPage dayPeriodName={selectedPeriodInfo!}/>
        case DayInfoPages.FOOD_SEARCH:
            return <FoodSearchPage action={()=> changeDayInfoPage(DayInfoPages.PERIOD_INFO_DATA)} />

    }
}