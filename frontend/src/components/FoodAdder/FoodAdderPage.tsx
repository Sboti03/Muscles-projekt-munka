import {useContext, useEffect, useState} from "react";
import FoodContext from "./context/FoodContext";
import FoodSearchPage from "./FoodSearchPage";
import {FoodDetails} from "./FoodDetails/FoodDetails";
import DayInfoNavigatorContext, {DayInfoPages} from "../DayInfo/Navigator/Context/DayInfoNavigatorContext";

export default function FoodAdderPage() {

    const {currentFood, setCurrentFood, addFood} = useContext(FoodContext)
    const [render, setRender] = useState(<FoodSearchPage action={back} />)
    const {changeDayInfoPage} = useContext(DayInfoNavigatorContext)


    function back() {
        changeDayInfoPage(DayInfoPages.PERIOD_INFO_DATA)
    }

    function cancel() {
        setCurrentFood(undefined)
        setRender(<FoodSearchPage action={back} />)
    }

    function handleAction(ammount: number) {
        addFood(ammount)
        cancel()
    }



    useEffect(()=> {
        console.log('asdasd')
        if (currentFood) {
            setRender(<FoodDetails food={currentFood} action={handleAction} cancel={cancel} btnText="Add food" />)
        }
    }, [currentFood])

    return (
        <>
            {render}
        </>
    )
}