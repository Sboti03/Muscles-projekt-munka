import {Methods, singleFetch} from "../../utils/Fetch";
import {normalizeDate} from "../DayInfoContextProvider";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";

export default async function dayPeriodInfoFetch(date: Date, periodName: DayPeriodName) {
    const {error, response} = await singleFetch<DayPeriodResponse[]>(`/api/meal-history/?date=${normalizeDate(date)}&periodName=${periodName}`, Methods.GET)
    if (response) {
        return {response}
    }
    return {error}
}

export enum DayPeriodName {
    BREAKFAST= 'breakfast',
    DINNER = 'Dinner',
    LUNCH = 'Lunch',
    OTHER = 'Other'
}