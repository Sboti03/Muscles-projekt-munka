import FoodDayInfo from "./FoodDayInfo/FoodDayInfo";
import DayPeriodInfo from "./DayPeriodInfo/DayPeriodInfo";
import React, {useContext} from "react";
import WeightInfo from "./WeightInfo/WeightInfo";
import DayInfoContext from "./context/DayInfoContext";
import Comment from "./Comment/Comment";
import UserCoachContext from "../UserCoach/context/UserCoachContext";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import AuthContext from "../Auth/AuthContext";
import {RoleEnum} from "../Types/Role";
import {Button} from "@mui/joy";


export default function MinimalDayData() {
    const {currentDate, dayInfo} = useContext(DayInfoContext)
    const {connections} = useContext(UserCoachContext)
    const {changePage} = useContext(NavigatorContext)
    const {user} = useContext(AuthContext)

    return (
        <>
            <div className="full-center">
                <FoodDayInfo dayInfo={dayInfo}/>
            </div>
            <div>
                <DayPeriodInfo/>
            </div>
            <div>
                <WeightInfo weight={dayInfo?.weight ? dayInfo.weight : 0} currentDate={currentDate}/>
            </div>
            {
                connections && connections.find(value => value.accessAll) && <div>
                    <Comment />
                </div>
            }
            {
                user?.role.roleName === RoleEnum.COACH &&
                <div className="flex justify-center">
                    <Button onClick={()=> changePage(Page.RESULTS)}>View results</Button>
                </div>
            }
        </>
    )
}