import {useContext, useEffect} from "react";
import DayInfoContext from "../context/DayInfoContext";
import './FoodDayInfo.css'
import {extendTheme, LinearProgress} from "@mui/joy";
import {DayInfoData, MinimalDayInfoData} from "../Data/DayInfoData";

export default function FoodDayInfo(props: {dayInfo: MinimalDayInfoData | undefined}) {
    const {dayInfo} = props
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
                    <div className="fdi-main-text">
                        <div>{dayInfo?.shouldEat}</div>
                        <div>Should eat</div>
                    </div>
                </div>
                <div className="food-day-progress-box">
                    <div className="fdi-mini-text">
                        <div>Carbohydrate</div>
                        <div>
                            <LinearProgress determinate value={dayInfo?.progressCarbohydrate} />
                        </div>
                        <div>{dayInfo?.eatenCarbohydrate}/{dayInfo?.totalCarbohydrate}</div>
                    </div>
                    <div className="fdi-mini-text">
                        <div>Protein</div>
                        <div>
                            <LinearProgress determinate value={dayInfo?.progressProtein} />
                        </div>
                        <div>{dayInfo?.eatenProtein}/{dayInfo?.totalProtein}</div>
                    </div>
                    <div className="fdi-mini-text">
                        <div>Fat</div>
                        <div>
                            <LinearProgress determinate value={dayInfo?.progressFat} />
                        </div>
                        <div>{dayInfo?.eatenFat}/{dayInfo?.totalFat}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}



