import {Methods, singleFetch} from "../../utils/Fetch";
import {dayPeriodName} from "./DayPeriodInfo";
import {normalizeDate} from "../DayInfoContextProvider";

export default async function dayPeriodInfoFetch(date: Date, periodName: dayPeriodName) {
    const {error, response} = await singleFetch(`/api/meal-history/?date=${normalizeDate(date)}&periodName=${periodName}`, Methods.GET)
    console.log(error)


}