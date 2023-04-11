import {Methods, singleFetch} from "../../utils/Fetch";
import {normalizeDate} from "../context/DayInfoContextProvider";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";

export default async function dayPeriodInfoFetch(date: Date, periodName: DayPeriodName): Promise<DayPeriodInfoFetchResponse> {
    const {error, response} = await singleFetch<DayPeriodResponse[]>(`/api/meal-history/?date=${normalizeDate(date)}&periodName=${periodName}`, Methods.GET)
    if (response) {
        return {response}
    }
    return {error}
}

export enum DayPeriodName {
    BREAKFAST= 'breakfast',
    DINNER = 'dinner',
    LUNCH = 'lunch',
    OTHER = 'other'
}


export interface DayPeriodInfoFetchResponse {
    response?: DayPeriodResponse[],
    error?: any
}