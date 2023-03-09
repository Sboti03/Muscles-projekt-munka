import {useContext, useEffect} from "react";
import DayInfoContext from "../DayInfoContext";

export default function FoodDayInfo( ) {
    const {dayInfo} = useContext(DayInfoContext)
    return (
        <div>
            <div>
                <div>
                    <div>{dayInfo?.eaten}</div>
                    <div>Eaten</div>
                </div>
                <div>
                    <div>{dayInfo?.left}</div>
                    <div>Left</div>
                </div>
            </div>
            <div>
                <div>{dayInfo?.eatenCarbohydrate}</div>
                <div>Carbohydrate</div>
            </div>
            <div>
                <div>{dayInfo?.eatenProtein}</div>
                <div>Protein</div>
            </div>
            <div>
                <div>{dayInfo?.eatenFat}</div>
                <div>Fat</div>
            </div>
        </div>
    )
}