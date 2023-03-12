import {DayPeriodInfoFetchResponse, DayPeriodName} from "../DayPeriodInfo/DayPeriodInfoFetch";
import {useContext, useMemo} from "react";
import DayPeriodContext from "../DayPeriodInfo/DayPeriodContext";
import Food from "./Food";
import './PeriodInfoPage.css'
export default function PeriodInfoPage(props: {dayPeriodName: DayPeriodName }) {

    const {dinner, other, lunch, breakfast} = useContext(DayPeriodContext)
    const periodData = useMemo(()=> {
        switch (props.dayPeriodName) {
            case DayPeriodName.BREAKFAST:
                return breakfast;
            case DayPeriodName.DINNER:
                return dinner;
            case DayPeriodName.OTHER:
                return other;
            case DayPeriodName.LUNCH:
                return lunch;
        }
    }, [props.dayPeriodName, dinner, other, lunch, breakfast])



    return (
        <>
          <div className="food-container">
              {periodData?.map((data, i)=> <Food data={data} key={i}/>)}
          </div>
        </>
    )
}