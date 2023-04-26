import {useContext, useState} from "react";
import ProfileDataView from "./ProfileDataView/ProfileDataView";
import GoalsDataView from "./GoalsDataView/GoalsDataView";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import AuthContext from "../Auth/AuthContext";
import {RoleEnum} from "../Types/Role";


export default function ProfileCreatePage() {
    const {user} = useContext(AuthContext)
    const profile = <>
        <div className="max-w-md m-auto">
            <ProfileDataView saveBtn={"Next"} backBtn={undefined} saveBtnAction={renderGoals}/>
        </div>

    </>
    const goals = <GoalsDataView saveBtnAction={loadHomePage} saveBtn={"Next"} backBtn={undefined} />
    const {changePage} = useContext(NavigatorContext)
    const [render, setRender] = useState(profile)
    const renderList = [profile, goals]


    function renderGoals() {
        setRender(renderList[1])
    }

    function loadHomePage() {
        if (user?.role.roleName === RoleEnum.COACH) {
            changePage(Page.COACH_HOME)
        } else {
            changePage(Page.HOME)
        }
    }



    return (
        <>
            {render}
        </>
    )
}