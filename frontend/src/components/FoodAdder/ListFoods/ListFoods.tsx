import {capitalize} from "@mui/material";
import {Button, Table} from "@mui/joy";
import LoadingManager from "../../Loading/LoadingManager";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import styles from '../FoodSearchPage.module.css'
import {Food} from "../FoodSearchPage";
import FoodContext from "../context/FoodContext";
import DayInfoContext from "../../DayInfo/context/DayInfoContext";
import DayPeriodContext from "../../DayInfo/DayPeriodInfo/context/DayPeriodContext";


interface Props {
    foods: Food[] | undefined
    addAmount: number
}

export default function ListFoods(props: Props) {
    const {setCurrentFood, addFood, loadingFoodAdd} = useContext(FoodContext)
    const {foods, addAmount} = props
    const {setDayPeriods} = useContext(DayPeriodContext)

    function showFood(food: Food) {
        setCurrentFood(food)
    }
    const [loadingIds, setLoadingIds] = useState<number[]>([])

    function handleAddFood(foodId: number) {
        if (addAmount > 0) {
            setLoadingIds([...loadingIds, foodId])
            addFood(addAmount, foodId).then(()=> {
                setLoadingIds(prevState => prevState.filter(id=> id !== foodId))
                setDayPeriods().then()
            })
        }
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th style={{width: '50%'}} >Name</th>
                    <th>kCal</th>
                    <th style={{width: '15%'}}></th>
                    <th style={{width: '10%'}}></th>
                </tr>
            </thead>
            <tbody>
            {foods?.map(food => (
                <tr key={food.foodId}>
                    <td>
                        {capitalize(food.name)}
                    </td>
                    <td>
                        {addAmount ? Math.round(food.kcal / food.perUnit * addAmount) : food.kcal}kcal
                    </td>

                    <td>
                        <Button disabled={loadingIds.includes(food.foodId) ? loadingFoodAdd : false} onClick={() => handleAddFood(food.foodId)}>
                            <LoadingManager size={'sm'} isLoading={loadingIds.includes(food.foodId) ? loadingFoodAdd : false}>
                                Add
                            </LoadingManager>
                        </Button>
                    </td>

                    <td>
                        <button className={styles.info} onClick={()=> showFood(food)}><FontAwesomeIcon icon={faInfo}/></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}