import {useContext, useEffect, useState} from "react";
import FoodContext from "./context/FoodContext";
import FoodSearchPage from "./FoodSearchPage";
import {FoodDetails} from "./FoodDetails/FoodDetails";
import DayInfoNavigatorContext, {DayInfoPages} from "../DayInfo/Navigator/Context/DayInfoNavigatorContext";
import DayPeriodContext from "../DayInfo/DayPeriodInfo/context/DayPeriodContext";
import {RoleEnum} from "../Types/Role";
import {normalizeDate} from "../DayInfo/context/DayInfoContextProvider";
import AuthContext from "../Auth/AuthContext";
import DayInfoContext from "../DayInfo/context/DayInfoContext";

export default function FoodAdderPage() {

    const {currentFood, setCurrentFood, addFood} = useContext(FoodContext)
    const {setDayPeriods} = useContext(DayPeriodContext)
    const [render, setRender] = useState(<FoodSearchPage action={back} />)
    const {changeDayInfoPage} = useContext(DayInfoNavigatorContext)
    const {user} = useContext(AuthContext)
    const {currentDate} = useContext(DayInfoContext)


    function back() {
        changeDayInfoPage(DayInfoPages.PERIOD_INFO_DATA)
    }

    function cancel() {
        setCurrentFood(undefined)
        setRender(<FoodSearchPage action={back} />)
    }

    async function handleAction(ammount: number) {
        const isCompleted = user?.role.roleName === RoleEnum.USER ? normalizeDate(new Date()) === normalizeDate(currentDate) : false
        addFood(ammount, currentFood?.foodId, isCompleted).then(()=> {
            setDayPeriods().then()
        })
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