import {useContext, useEffect} from "react";
import DayInfoContext from "../DayInfoContext";
import './FoodDayInfo.css'
import {extendTheme, LinearProgress} from "@mui/joy";

export default function FoodDayInfo( ) {
    const {dayInfo} = useContext(DayInfoContext)
    return (
        <div className="food-day-container">
            <div>
                <div className="food-day-info-box">
                    <div className="fdi-main-text">
                        <div>{dayInfo?.eaten}</div>
                        <div>Eaten</div>
                    </div>
                    <div className="fdi-main-text">
                        <div>{dayInfo?.left}</div>
                        <div>Left</div>
                    </div>
                </div>
                <div className="food-day-progress-box">
                    <div className="fdi-mini-text">
                        <div>Carbohydrate</div>
                        <LinearProgress determinate value={dayInfo?.progressCarbohydrate} />
                        <div>{dayInfo?.eatenCarbohydrate}</div>
                    </div>
                    <div className="fdi-mini-text">
                        <div>Protein</div>
                        <LinearProgress determinate value={dayInfo?.progressProtein} />
                        <div>{dayInfo?.eatenProtein}</div>
                    </div>
                    <div className="fdi-mini-text">
                        <div>Fat</div>
                        <LinearProgress determinate value={dayInfo?.progressFat} />
                        <div>{dayInfo?.eatenFat}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}



