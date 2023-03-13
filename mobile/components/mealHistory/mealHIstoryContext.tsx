import User from "../auth/types/user";
import MealHistory from "./types/mealHistory";

export interface MealHistoryContextValue {
    mealHistory: MealHistory[] | undefined,
    addMealHistory: (addMealHistory: MealHistory) => void

    updateMealHistory: () => void

}