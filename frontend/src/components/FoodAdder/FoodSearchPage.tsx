import {useEffect, useMemo, useState} from "react";
import useFetch, {Methods, singleFetch} from "../utils/Fetch";
import {Input} from "@mui/joy";

export default function FoodSearchPage() {

    const {response, isLoading, error} = useFetch<Food[]>('api/food', Methods.GET)
    const [search, setSearch] = useState('')
    const result = useMemo(()=> {return response?.filter(food => food.name.includes(search))}, [search, response])


    return (
        <>
            <Input type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            {result?.map(food=> (
                <>
                    <div>
                        {food.name}
                    </div>
                    <div>
                        {food.foodId}
                    </div>
                </>
            ))}
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