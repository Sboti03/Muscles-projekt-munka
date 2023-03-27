import {DayPeriodResponse} from "../Data/DayPeriodResponse";
import './Food.css'
import {Button, Checkbox} from "@mui/joy";
import {useContext, useState} from "react";
import DayPeriodContext from "../DayPeriodInfo/context/DayPeriodContext";
import DayInfoNavigatorContext from "../Navigator/Context/DayInfoNavigatorContext";

export default function Food(props: { data: DayPeriodResponse }) {
    const {meal} = props.data
    const {food, amount, addedBy, completed} = meal
    const [isCompleted, setIsCompleted] = useState(completed)
    const {setMealCompleted, deleteMealHistory} = useContext(DayPeriodContext)
    const {loadFoodEdit} = useContext(DayInfoNavigatorContext)

    function handleFoodEditClick() {
        loadFoodEdit(props.data)
    }

    return (
        <div className="food">
            <button className="food-btn" onClick={handleFoodEditClick}>
                <div>{food.name}</div>
                <div>{amount} gramm</div>
                <div>{Math.round(food.kcal / food.perUnit * meal.amount)}kcal</div>
            </button>
            <Checkbox
                onChange={event => {
                setMealCompleted(event.target.checked, props.data.mealHistoryId);
                setIsCompleted(!isCompleted)
            }} checked={isCompleted} color={"success"} variant="soft"/>
            <Button
                color="danger"
                onClick={() => deleteMealHistory(props.data.mealHistoryId)}
            >X</Button>
        </div>
    )
}

