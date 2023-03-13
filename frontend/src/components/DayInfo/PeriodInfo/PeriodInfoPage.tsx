import {DayPeriodName} from "../DayPeriodInfo/DayPeriodInfoFetch";
import {useContext, useMemo} from "react";
import DayPeriodContext from "../DayPeriodInfo/DayPeriodContext";
import Food from "./Food";
import './PeriodInfoPage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import FoodContext from "../../FoodAdder/FoodContext";
import DayInfoContext from "../DayInfoContext";

export default function PeriodInfoPage(props: { dayPeriodName: DayPeriodName }) {

    const {dinner, other, lunch, breakfast} = useContext(DayPeriodContext)
    const {currentDate} = useContext(DayInfoContext)
    const {changePage} = useContext(NavigatorContext)
    const {setCurrentDate} = useContext(FoodContext)
    const periodData = useMemo(() => {
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


    function loadFoodPSearchPage() {
        setCurrentDate(currentDate)
        changePage(Page.FOOD_SEARCH)
    }

    return (
        <>
            <div className="food-container">
                {periodData?.map((data, i) => <Food data={data} key={i}/>)}
            </div>
            <div onClick={loadFoodPSearchPage} className="add-container">
                <button className="add-btn">
                    <FontAwesomeIcon icon={faCirclePlus} />
                </button>
            </div>
        </>
    )
}