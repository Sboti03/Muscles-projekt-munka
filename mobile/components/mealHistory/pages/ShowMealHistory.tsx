import {Flex, IconButton, ListItem, Text} from "@react-native-material/core";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import MealHistoryContext from "../mealHistoryContext";
import {BASE_URL} from "@env";
import FoodInterface from "../../food/foodInterface";
import axios from "axios";
import NavigatorContext, {Page} from "../../navigator/NavigatorProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DayPeriodResponse} from "../types/Meal";
import {NormalizeDate} from "./CreateMealHistory";
import {getOneFoodCalorie} from "../../food/foodCalculations";

const getDayHistoriesByMealPeriodAndDate= BASE_URL + 'api/meal-history?date='
const getFoodByFoodIdAPI = BASE_URL + 'api/food/?id='
const deleteMealHistoryAPI = BASE_URL + 'api/meal-history/'
const getMealHistoryData = BASE_URL + 'api/meal-history/data/?date='



function ShowMealHistory() {
    const {mealHistory, mealPeriod, setFoods, foods, dayHistories, date, setDayHistories, setCurrentPlaceOfDayPeriodResponse, setMealHistory, deleteDayHistory} = useContext(MealHistoryContext)
    const {changePage} = useContext(NavigatorContext)

    const [currentMealHistories, setCurrentMealHistories] = useState<DayPeriodResponse[]>([])

    const deleteFood = (id: number) => {
        console.log(id)
        console.log(deleteMealHistoryAPI + '1')
        deleteDayHistory(id)
        axios.delete(deleteMealHistoryAPI + id)
            .then(function (response) {
                console.log('Delete was successful')
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            })

    }

    useEffect( function ()  {
        console.log('NORMALIZED DATE')
        console.log(NormalizeDate(date))

        const url: string = getDayHistoriesByMealPeriodAndDate + NormalizeDate(date) + '&periodName=' + mealPeriod
        axios.get(url)
            .then(async function (response) {
                console.log('RESPONSE')
                console.log(response.data as DayPeriodResponse[])
                await setDayHistories(response.data as DayPeriodResponse[])
            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])
    useEffect(() => {
        console.log('SET-DAY-Histories')
        console.log(mealHistory.dayHistory)
        setDayHistories(mealHistory.dayHistory!)
    }, [mealHistory])

    // useEffect(() => {
    //     let foodsFromBackend: FoodInterface[] = []
    //     console.log('CURRENT DAY HISTORIES')
    //     console.log(dayHistories)
    //     dayHistories?.forEach(function (dayHistoryResponse) {
    //         foodsFromBackend.push(dayHistoryResponse.meal.food)
    //     })
    //     console.log('FOODS FROM BACKEND')
    //     console.log(foodsFromBackend)
    //     // dayHistories!.map(async (dayHistory) => {
    //     //     await axios.get(getFoodByFoodIdAPI + dayHistory.meal.food.foodId.toString())
    //     //         .then(function (response) {
    //     //             console.log('RESPONSE DATA')
    //     //             console.log(response.data)
    //     //             foodsFromBackend.push(response.data as FoodInterface)
    //     //         })
    //     //         .catch(function (error) {
    //     //             console.log(error)
    //     //         })
    //     // })
    //     setFoods(foodsFromBackend)
    // }, [dayHistories])
    //
    // useEffect(() => {
    //     console.log('FOODS')
    //     console.log(foods)
    // }, [foods])





    return(
        <Flex>
            <Text style={{marginTop: 30}}>{mealPeriod?.toUpperCase()}</Text>
            <IconButton onPress={() =>changePage(Page.HOME)
            }
                        icon={<MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30} color={'#7a44cf'} />} style={{marginLeft:5}}/>
            {dayHistories.length === 0?
                <Text>There are no foods</Text>:
            dayHistories.map((currentDayPeriodResponse, index) => (
                    <ListItem key={currentDayPeriodResponse.mealHistoryId}
                                 title={currentDayPeriodResponse.meal.food.name + '     ' + getOneFoodCalorie(currentDayPeriodResponse.meal.food.perUnit, currentDayPeriodResponse.meal.food.kcal, currentDayPeriodResponse.meal.amount).toFixed(2).toString() + ' kcal'}
                                 onPress={() => {
                                     setCurrentPlaceOfDayPeriodResponse(index)
                                    changePage(Page.SHOWFODDETAILS)
                                 }}
                                 trailing={<IconButton icon={<MaterialCommunityIcons name={'delete-forever'} size={30} color={'#7a44cf'}/>}
                                                       style={{marginRight: 20}}
                                                       onPress={() => deleteFood(currentDayPeriodResponse.mealHistoryId)}
                                                       key={currentDayPeriodResponse.mealHistoryId}
                                 />}
                />
            ))}
        </Flex>
    )
}
export default ShowMealHistory