import {MealHistoryResponse} from "./Data/MealHistoryResponse";
import {DayInfoData} from "./Data/DayInfoData";
import {RoleEnum} from "../Types/Role";

export function calculateDayInfoData(mealHistoryResponse: MealHistoryResponse): DayInfoData {
    const PROTEIN_PER_KCAL = 4;
    const FAT_PER_KCAL = 9;
    const CARBOHYDRATE_PER_KCAL = 4;

    const {goal} = mealHistoryResponse

    let eatenFat = 0;
    let eatenCarbohydrate = 0;
    let eaten = 0;
    let totalCalorie = goal.targetCalories ? goal.targetCalories : 0;
    let eatenProtein = 0;
    let shouldEat = 0;

    mealHistoryResponse.dayHistory.forEach(day => {
        const perEach = (day.meal.amount) / day.meal.food.perUnit
        const {food} = day.meal
        eatenFat += food.fat * perEach;
        eatenCarbohydrate += food.carbohydrate * perEach;
        eatenProtein += food.protein * perEach;
        if (day.meal.addedBy === RoleEnum.COACH && !day.meal.completed){
            shouldEat += food.kcal
        } else {
            eaten += perEach * food.kcal
        }
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
        weight: mealHistoryResponse.weight.weight,
        eatenFat,
        eatenCarbohydrate,
        eaten,
        left: totalCalorie - eaten,
        eatenProtein,
        totalProtein,
        totalCarbohydrate,
        totalFat,
        progressCarbohydrate: clamp(Math.round(eatenCarbohydrate / totalCarbohydrate * 100)),
        progressProtein: clamp(Math.round(eatenCarbohydrate / totalCarbohydrate * 100)),
        progressFat: clamp(Math.round(eatenCarbohydrate / totalCarbohydrate * 100)),
        totalBreakfast,
        totalDinner,
        totalLunch,
        totalOther,
        shouldEat,
    }
}
const clamp = (num: number) => Math.min(Math.max(num, 0), 100);
