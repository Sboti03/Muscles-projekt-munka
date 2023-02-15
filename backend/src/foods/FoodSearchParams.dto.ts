export interface FoodSearchParam {
    name?: string;

    minKcal?: number;
    maxKcal?: number;

    minProtein?: number;
    maxProtein?: number;

    maxFat?: number;
    minFat?: number;

    maxSugar?: number;
    minSugar?: number;

    maxFiber?: number;
    minFiber?: number;

    maxCarbohydrate?: number;
    minCarbohydrate?: number;
}