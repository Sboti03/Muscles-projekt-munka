import {useContext, useMemo, useState} from "react";
import useFetch, {Methods} from "../utils/Fetch";
import {Button, Input} from "@mui/joy";
import styles from './FoodSearchPage.module.css'
import FoodContext from "./FoodContext";

export default function FoodSearchPage() {

    const {response, isLoading, error} = useFetch<Food[]>('api/food', Methods.GET)
    const [search, setSearch] = useState('')
    const {setCurrentFood} = useContext(FoodContext)
    const result = useMemo(() => {
        return response?.filter(food => food.name.includes(search))
    }, [search, response])


    function addFood(food: Food) {
        setCurrentFood(food)
        
    }

    return (
        <>
            <Input type="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className={styles.container}>
                <div className={styles.foodResultBox}>
                    {result?.map(food => (
                        <div key={food.foodId} >
                            <div>
                                {food.name}
                            </div>
                            <div>
                                {food.kcal}kcal
                            </div>
                            <Button onClick={()=> addFood(food)}>
                                Add
                            </Button>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}


export interface Unit {
    unitId: number;
    unit: string;
    defaultValue: number;
    changedAt: Date;
}

export interface Food {
    foodId: number;
    name: string;
    kcal: number;
    unitId: number;
    perUnit: number;
    protein: number;
    fat: number;
    saturatedFat: number;
    polyunsaturatedFat: number;
    monounsaturatedFat: number;
    carbohydrate: number;
    sugar: number;
    fiber: number;
    changedAt: Date;
    unit: Unit;
}