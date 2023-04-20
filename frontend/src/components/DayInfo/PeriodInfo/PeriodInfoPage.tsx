import {DayPeriodName} from "../DayPeriodInfo/DayPeriodInfoFetch";
import {useContext, useMemo} from "react";
import DayPeriodContext from "../DayPeriodInfo/context/DayPeriodContext";
import Food from "./Food";
import './PeriodInfoPage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import NavigatorContext from "../../Navigator/NavigatorContext";
import FoodContext from "../../FoodAdder/context/FoodContext";
import DayInfoContext from "../context/DayInfoContext";
import {Button, Option, Select} from "@mui/joy";
import DayInfoNavigatorContext, {DayInfoPages} from "../Navigator/Context/DayInfoNavigatorContext";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";
import {DayInfoData, MinimalDayInfoData} from "../Data/DayInfoData";
import {calculateDayInfoData} from "../CalculateDayInfoData";
import {MealHistoryResponse} from "../Data/MealHistoryResponse";
import FoodDayInfo from "../FoodDayInfo/FoodDayInfo";


export default function PeriodInfoPage(props: { dayPeriodName: DayPeriodName }) {

    const {dinner, other, lunch, breakfast, setSelectedPeriodInfo} = useContext(DayPeriodContext)
    const {currentDate, dayInfo, mealHistoryResponse} = useContext(DayInfoContext)
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
    const total = getTotal(props.dayPeriodName, dayInfo)

    const periodInfoData = useMemo(()=> {
        if(periodData && mealHistoryResponse) {
           return calculateDayInfoData(getPeriodMealHistory(mealHistoryResponse, periodData, total))
        }
    }, [periodData])


    function loadFoodPSearchPage() {
        setCurrentDate(currentDate)
        setPeriodName(props.dayPeriodName)
        changeDayInfoPage(DayInfoPages.FOOD_SEARCH)
    }

    function loadPeriodInfo() {

    }

    function back() {
        changeDayInfoPage(DayInfoPages.MINIMAL_DATA)
    }

    return (
        <div className="food-list-container">
            <div className={"full-center"}>
                <FoodDayInfo dayInfo={periodInfoData} />
            </div>
            <div className="margin-top-10">
                <div className="add-container">
                    <Button onClick={back} >Back</Button>
                    <Select value={props.dayPeriodName} onChange={(e, value) => value ? setSelectedPeriodInfo(value) : {}}>
                        <Option value={DayPeriodName.BREAKFAST}>{DayPeriodName.BREAKFAST}</Option>
                        <Option value={DayPeriodName.LUNCH}>{DayPeriodName.LUNCH}</Option>
                        <Option value={DayPeriodName.DINNER}>{DayPeriodName.DINNER}</Option>
                        <Option value={DayPeriodName.OTHER}>{DayPeriodName.OTHER}</Option>
                    </Select>
                    <Button onClick={loadFoodPSearchPage} className="add-btn">
                        Add food <FontAwesomeIcon icon={faCirclePlus}/>
                    </Button>
                </div>
            </div>
            <div className="food-container">
                {periodData?.map((data, i) => <Food data={data} key={i}/>)}
            </div>
        </div>
    )
}

function getPeriodMealHistory(mealHistory: MealHistoryResponse, dayPeriod: DayPeriodResponse[], total: number): MealHistoryResponse {
    let goal = mealHistory.goal
    goal.targetCalories = total
    return {
        goal: goal,
        weight: mealHistory.weight,
        dayHistory: dayPeriod
    }
}
function getTotal(dayPeriodName: DayPeriodName, dayInfo: DayInfoData|undefined) {
    if (dayInfo) {
        switch (dayPeriodName) {
            case DayPeriodName.BREAKFAST:
                return dayInfo.totalBreakfast;
            case DayPeriodName.LUNCH:
                return dayInfo.totalLunch
            case DayPeriodName.OTHER:
                return dayInfo.totalOther
            case DayPeriodName.DINNER:
                return dayInfo.totalDinner
        }
    }
    return 0

}