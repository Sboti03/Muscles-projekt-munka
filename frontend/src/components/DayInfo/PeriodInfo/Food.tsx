import {DayPeriodResponse} from "../Data/DayPeriodResponse";
import './Food.css'
import {Checkbox} from "@mui/joy";
import {Methods, singleFetch} from "../../utils/Fetch";
import {useContext, useState} from "react";
import DayPeriodContext from "../DayPeriodInfo/DayPeriodContext";

export default function Food(props: {data: DayPeriodResponse}) {
    const {meal} = props.data
    const {food, amount, addedBy, completed} = meal
    const [isCompleted, setIsCompleted] = useState(completed)
    const {setMealCompleted, deleteMealHistory} = useContext(DayPeriodContext)
    return (
        <div className="food">
            <button className="food-btn">
                <div>{food.name}</div>
                <div>{amount} gramm</div>
                <div>{Math.round(food.kcal / food.perUnit * meal.amount)}kcal</div>
            </button>
            <Checkbox onChange={event => {
                setMealCompleted(event.target.checked, props.data.mealHistoryId);
                setIsCompleted(true)
            }} checked={isCompleted} color={"success"} variant="soft" />
            <button onClick={()=> deleteMealHistory(props.data.mealHistoryId)}>X</button>
        </div>
    )
}

