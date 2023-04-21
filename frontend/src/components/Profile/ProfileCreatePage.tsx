import {useContext, useEffect, useState} from "react";
import ProfileDataView from "./ProfileDataView/ProfileDataView";
import GoalsDataView from "./GoalsDataView/GoalsDataView";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import {signal} from "@preact/signals-react";
import AuthContext from "../Auth/AuthContext";
import {RoleEnum} from "../Types/Role";


export default function ProfileCreatePage() {
    const {user} = useContext(AuthContext)
    const profile = <>
        <div className="max-w-md m-auto">
            <ProfileDataView saveBtn={"Next"} backBtn={undefined} saveBtnAction={next}/>
        </div>

    </>
    const goals = <GoalsDataView saveBtnAction={next} saveBtn={"Next"} backBtn={undefined} />
    const {changePage} = useContext(NavigatorContext)
    const [render, setRender] = useState(profile)
    const renderState = signal(0)
    const renderList = [profile, goals]

    useEffect(()=> {
        renderState.value = 0
    }, [])

    function next() {
        renderState.value++
        if (renderState.value === renderList.length) {
            if (user?.role.roleName === RoleEnum.COACH) {
                changePage(Page.COACH_HOME)
            } else {
                changePage(Page.HOME)
            }
        } else {
            setRender(renderList[renderState.value])
        }
    }

    return (
        <>
            {render}
        </>
    )
}