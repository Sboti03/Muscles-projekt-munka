import MealHistoryInterface, {DayInfoData} from "../mealHistory/types/mealHistoryInterface";
import {PeriodNamesEnum} from "../mealHistory/types/dayHistoryInterface";
import axios from "axios";
import {BASE_URL} from "@env";
import {NormalizeDate} from "../mealHistory/pages/CreateMealHistory";
import {DayPeriodResponse} from "../mealHistory/types/Meal";
import {useContext} from "react";
import MealHistoryContext from "../mealHistory/mealHistoryContext";
import FoodInterface from "./foodInterface";

const getDayHistoriesByMealPeriodAndDate= BASE_URL + 'api/meal-history?date='
export function getOneFoodCalorie(perUnit: number, kcal: number, amount: number): number {
    return amount / perUnit * kcal
}
const clamp = (num: number) => Math.min(Math.max(num, 0), 100);
export function calculateDayInfoData(mealHistoryResponse: MealHistoryInterface): DayInfoData {
    const PROTEIN_PER_KCAL = 4;
    const FAT_PER_KCAL = 9;
    const CARBOHYDRATE_PER_KCAL = 4;

    const {goal} = mealHistoryResponse

    let eatenFat = 0;
    let eatenCarbohydrate = 0;
    let eaten = 0;
    let totalCalorie = goal.targetCalories ? goal.targetCalories : 0;
    let eatenProtein = 0;

    mealHistoryResponse.dayHistory?.forEach((day) => {
        const perEach = (day.meal.amount) / day.meal.food.perUnit
        const {food} = day.meal
        eatenFat += food.fat * perEach;
        eatenCarbohydrate += food.carbohydrate * perEach;
        eatenProtein += food.protein * perEach;
        eaten += perEach * food.kcal
    })

    eatenFat = Math.round(eatenFat)
    eatenCarbohydrate = Math.round(eatenCarbohydrate)
    eaten = Math.round(eaten)
    totalCalorie = Math.round(totalCalorie)
    eatenProtein = Math.round(eatenProtein)

    const totalProtein = Math.round(totalCalorie * (goal.proteinPerDay / 100) / PROTEIN_PER_KCAL);
    const totalCarbohydrate = Math.round(totalCalorie * (goal.carbohydratesPerDay / 100) / CARBOHYDRATE_PER_KCAL);
    const totalFat = Math.round(totalCalorie * (goal.fatPerDay / 100) / FAT_PER_KCAL);
    const targetCalorie = Math.round(goal.targetCalories ? goal.targetCalories : 2000)

    const totalBreakfast = Math.round((targetCalorie * goal.breakfastPerDay) / 100)
    const totalDinner = Math.round((targetCalorie * goal.dinnerPerDay) / 100)
    const totalLunch = Math.round((targetCalorie * goal.lunchPerDay) / 100)
    const totalOther = Math.round(totalCalorie - (totalBreakfast + totalDinner + totalLunch))

    return {
        weight: mealHistoryResponse.weight?.weight,
        eatenFat,
        eatenCarbohydrate,
        eaten,
        left: totalCalorie - eaten,
        eatenProtein,
        totalProtein,
        totalCarbohydrate,
        totalFat,
        progressCarbohydrate: eatenCarbohydrate / totalCarbohydrate ,
        progressProtein: eatenProtein / totalProtein ,
        progressFat: eatenFat / totalFat ,
        totalBreakfast,
        totalDinner,
        totalLunch,
        totalOther,
    }
}
export async function getConsumedCaloriesByMealPeriod(periodName: PeriodNamesEnum, date: Date): Promise<number> {
    let sum = 0

    const url: string = getDayHistoriesByMealPeriodAndDate + NormalizeDate(date) + '&periodName=' + periodName
    const value = axios.get(url)
        .then(function (response) {
            console.log('RESPONSE')
            console.log(response.data as DayPeriodResponse[])
            const responseData = response.data as DayPeriodResponse[]
            console.log('responseData[0].meal.food')
            console.log(responseData[0].meal.food)
            responseData.forEach((currentDayPeriodResponse) => {
                console.log('currentDayPeriodResponse')
                console.log(currentDayPeriodResponse)
                sum = sum + getOneFoodCalorie(currentDayPeriodResponse.meal.food.perUnit, currentDayPeriodResponse.meal.food.kcal, currentDayPeriodResponse.meal.amount)
            })
            console.log('RIGHT AFTER RESPONSE')
            console.log(sum)
            return sum
        })
        .catch(function (error) {
            console.log(error)
            return sum
        }).finally(()=> {
            return sum
        })

    return await value
}
export function getOneFoodInfo(dayPeriodResponse: DayPeriodResponse, amount: number): FoodInterface {

    const perUnit = dayPeriodResponse.meal.food.perUnit

    const kcal = Math.round(dayPeriodResponse.meal.food.kcal / perUnit * amount)
    const fat = Math.round(dayPeriodResponse.meal.food.fat / perUnit * amount)
    const carbohydrate = Math.round(dayPeriodResponse.meal.food.carbohydrate / perUnit * amount)
    const protein = Math.round(dayPeriodResponse.meal.food.protein / perUnit * amount)
    let fiber = 0
    let sugar = 0
    let monounsaturatedFat = 0
    let polyunsaturatedFat = 0
    let saturatedFat = 0
    if (dayPeriodResponse.meal.food.fiber !== undefined) {
        fiber +=  Math.round(dayPeriodResponse.meal.food.fiber / perUnit * amount)
    }if (dayPeriodResponse.meal.food.monounsaturatedFat !== undefined) {
        monounsaturatedFat +=  Math.round(dayPeriodResponse.meal.food.monounsaturatedFat / perUnit * amount)
    }if (dayPeriodResponse.meal.food.polyunsaturatedFat !== undefined) {
        polyunsaturatedFat +=  Math.round(dayPeriodResponse.meal.food.polyunsaturatedFat / perUnit * amount)
    }if (dayPeriodResponse.meal.food.sugar !== undefined) {
        sugar +=  Math.round(dayPeriodResponse.meal.food.sugar / perUnit * amount)
    }if (dayPeriodResponse.meal.food.saturatedFat !== undefined) {
        saturatedFat +=  Math.round(dayPeriodResponse.meal.food.saturatedFat / perUnit * amount)
    }

    return {
        kcal,
        perUnit,
        foodId: dayPeriodResponse.meal.food.foodId,
        fat,
        name: dayPeriodResponse.meal.food.name,
        carbohydrate,
        fiber,
        protein,
        unit: dayPeriodResponse.meal.food.unit,
        sugar,
        monounsaturatedFat,
        polyunsaturatedFat,
        saturatedFat
    }
}