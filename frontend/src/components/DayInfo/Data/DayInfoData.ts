export interface DayInfoData {
    eaten: number,
    left: number,
    eatenCarbohydrate: number,
    eatenProtein: number,
    eatenFat: number,
    weight: number | undefined,
    totalFat: number,
    totalCarbohydrate: number,
    totalProtein: number,
    progressProtein: number,
    progressFat: number,
    progressCarbohydrate: number,
    totalBreakfast: number,
    totalDinner: number,
    totalLunch: number,
    totalOther: number,
    shouldEat: number
}


export interface MinimalDayInfoData {
    eaten: number,
    left: number,
    eatenCarbohydrate: number,
    eatenProtein: number,
    eatenFat: number,
    totalFat: number,
    totalCarbohydrate: number,
    totalProtein: number,
    progressProtein: number,
    progressFat: number,
    progressCarbohydrate: number,
    shouldEat: number

}