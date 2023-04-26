import React from "react";
import {DayPeriodName} from "../DayInfo/DayPeriodInfo/DayPeriodInfoFetch";
import {RoleEnum} from "../Types/Role";

interface ResultsContextValue {
    oneMonthSelect: ()=> void,
    threeMonthSelect: ()=> void,
    sixMonthSelect: ()=> void,
    oneYearSelect: ()=> void,
    setPrevMonth: ()=> void,
    setNextMonth: ()=> void,
    range: ResultsRange
    results: ResultsData[]
    mode: ResultsMode
    filters: ResultFilter,
    setMode: (mode: ResultsMode) => void,
    setFilters: (filters: ResultFilter) => void

}

export interface ResultsData {
    date: Date,
    weightHistory: {
        weight: number,
    }
    mealHistory: MealHistory[]
}


export interface MealHistory {
    periodName: DayPeriodName
    meal: Meal
}

export interface Meal {
    addedBy: RoleEnum,
    completed: boolean,
    amount: number,
    food: Food
}

export interface Unit {
    unit: string
    defaultValue: number
}

export interface Food {
    unit: Unit
    kcal: number,
    fat: number,
    fiber: number,
    sugar: number,
    foodId: number,
    protein: number,
    name: string,
    carbohydrates: number,
    perUnit: number
}

export interface ResultsRange {
    from: Date,
    to: Date
}
export enum ResultsMode {
    WEIGHT = "WEIGHT",
    MEAL = "MEAL"
}

export interface ResultFilter {
    isCompleted: boolean | 'ALL',
    addedBy: RoleEnum | 'ALL',
    periodName: DayPeriodName | 'ALL',

}

const ResultsContext = React.createContext<ResultsContextValue>(null as any)

export default ResultsContext