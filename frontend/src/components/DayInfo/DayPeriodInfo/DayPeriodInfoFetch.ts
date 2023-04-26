import {Methods, singleFetch} from "../../utils/Fetch";
import {normalizeDate} from "../context/DayInfoContextProvider";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";

export default async function dayPeriodInfoFetch(date: Date, periodName: DayPeriodName, userId?: number): Promise<DayPeriodInfoFetchResponse> {
    const path = `/api/meal-history/?date=${normalizeDate(date)}&periodName=${periodName}${userId ? '&userId=' + userId : ''}`
    const {error, response} = await singleFetch<DayPeriodResponse[]>(path, Methods.GET)
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