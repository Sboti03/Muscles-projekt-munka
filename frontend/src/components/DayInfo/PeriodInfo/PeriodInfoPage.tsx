import {DayPeriodName} from "../DayPeriodInfo/DayPeriodInfoFetch";
import {useContext, useMemo} from "react";
import DayPeriodContext from "../DayPeriodInfo/context/DayPeriodContext";
import Food from "./Food";
import './PeriodInfoPage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";
import FoodContext from "../../FoodAdder/context/FoodContext";
import DayInfoContext from "../DayInfoContext";
import {Button} from "@mui/joy";
import DayInfoNavigatorContext, {DayInfoPages} from "../Navigator/Context/DayInfoNavigatorContext";

export default function PeriodInfoPage(props: { dayPeriodName: DayPeriodName }) {

    const {dinner, other, lunch, breakfast, setSelectedPeriodInfo} = useContext(DayPeriodContext)
    const {currentDate} = useContext(DayInfoContext)
    const {changePage} = useContext(NavigatorContext)
    const {setCurrentDate, setPeriodName} = useContext(FoodContext)
    const {changeDayInfoPage} = useContext(DayInfoNavigatorContext)
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
        setPeriodName(props.dayPeriodName)
        changePage(Page.FOOD_SEARCH)
    }

    function loadPeriodInfo() {

    }

    function back() {
        setSelectedPeriodInfo(undefined)
        changeDayInfoPage(DayInfoPages.MINIMAL_DATA)
    }

    return (
        <>
            <Button onClick={back}>Back</Button>
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