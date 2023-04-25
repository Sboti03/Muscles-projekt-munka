import {capitalize, TableBody, TableHead} from "@mui/material";
import {Button, Table} from "@mui/joy";
import LoadingManager from "../../Loading/LoadingManager";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import styles from '../FoodSearchPage.module.css'
import {Food} from "../FoodSearchPage";
import FoodContext from "../context/FoodContext";
import DayPeriodContext from "../../DayInfo/DayPeriodInfo/context/DayPeriodContext";
import AuthContext from "../../Auth/AuthContext";
import {RoleEnum} from "../../Types/Role";
import {normalizeDate} from "../../DayInfo/context/DayInfoContextProvider";
import DayInfoContext from "../../DayInfo/context/DayInfoContext";


interface Props {
    foods: Food[] | undefined
    addAmount: number
}

export default function ListFoods(props: Props) {
    const {setCurrentFood, addFood, loadingFoodAdd} = useContext(FoodContext)
    const {foods, addAmount} = props
    const {setDayPeriods} = useContext(DayPeriodContext)
    const {user} = useContext(AuthContext)
    const {currentDate} = useContext(DayInfoContext)

    function showFood(food: Food) {
        console.log(food)
        setCurrentFood(food)

    }
    const [loadingIds, setLoadingIds] = useState<number[]>([])

    function handleAddFood(foodId: number) {
        if (addAmount > 0) {
            setLoadingIds([...loadingIds, foodId])
            const isCompleted = user?.role.roleName === RoleEnum.USER ? normalizeDate(new Date()) === normalizeDate(currentDate) : false
            addFood(addAmount, foodId, isCompleted).then(()=> {
                setLoadingIds(prevState => prevState.filter(id=> id !== foodId))
                setDayPeriods().then()
            })
        }
    }

    return (
        <Table>
            <TableHead>
                <tr>
                    <th style={{width: '50%'}} >Name</th>
                    <th>kCal</th>
                    <th style={{width: '15%'}}></th>
                    <th style={{width: '10%'}}></th>
                </tr>
            </TableHead>
            <TableBody>
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
            </TableBody>
        </Table>
    )
}