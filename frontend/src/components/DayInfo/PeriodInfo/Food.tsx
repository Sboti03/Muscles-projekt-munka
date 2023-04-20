import {DayPeriodResponse} from "../Data/DayPeriodResponse";
import './Food.css'
import {Button, Checkbox} from "@mui/joy";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import DayPeriodContext from "../DayPeriodInfo/context/DayPeriodContext";
import DayInfoNavigatorContext from "../Navigator/Context/DayInfoNavigatorContext";
import {capitalize} from "@mui/material";
import LoadingManager from "../../Loading/LoadingManager";
import AuthContext from "../../Auth/AuthContext";
import {RoleEnum} from "../../Types/Role";

export default function Food(props: { data: DayPeriodResponse }) {
    const {meal} = props.data
    const {food, amount, addedBy, completed} = meal
    const [isCompleted, setIsCompleted] = useState(completed)
    const {setMealCompleted, deleteMealHistory} = useContext(DayPeriodContext)
    const {loadFoodEdit} = useContext(DayInfoNavigatorContext)
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(AuthContext)
    function handleFoodEditClick() {
        loadFoodEdit(props.data)
    }

    async function handleDelete() {
        setIsLoading(true)
        const res = await deleteMealHistory(props.data.mealHistoryId)
        if (res) {
            setIsLoading(false)
        }
    }

    async function handleIsCompletedChange(event: ChangeEvent<HTMLInputElement>) {
        await setMealCompleted(event.target.checked, props.data.mealHistoryId);
        setIsCompleted(!isCompleted)
    }


    return (
        <div className="food">
            <button className="food-btn" onClick={handleFoodEditClick}>
                <div>{capitalize(food.name)}</div>
                <div>{amount} gram</div>
                <div>{Math.round(food.kcal / food.perUnit * meal.amount)}kCal</div>
            </button>
            <div className="flex justify-center">
                <Checkbox
                    onChange={handleIsCompletedChange} disabled={user?.role.roleName !== RoleEnum.USER} checked={isCompleted} color={"success"} variant="soft"/>
            </div>
            <div className="text-center">{addedBy === RoleEnum.COACH ? RoleEnum.COACH : ''}</div>
            {user!.role.roleName === addedBy &&
                <Button className="delete-btn"
                        color="danger"
                        disabled={isLoading}
                        onClick={() => handleDelete()}
                >
                    <LoadingManager isLoading={isLoading} size="sm">
                        X
                    </LoadingManager>
                </Button>
            }

        </div>
    )
}

