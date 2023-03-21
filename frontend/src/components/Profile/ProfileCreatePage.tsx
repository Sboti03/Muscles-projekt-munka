import {useContext, useState} from "react";
import ProfileDataView from "./ProfileDataView/ProfileDataView";
import GoalsDataView from "./GoalsDataView/GoalsDataView";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";


export default function ProfileCreatePage() {

    const profile = <ProfileDataView saveBtn={"Next"} backBtn={undefined} saveBtnAction={next}/>
    const goals = <GoalsDataView saveBtnAction={next} saveBtn={"Next"} backBtn={undefined} />
    const {changePage} = useContext(NavigatorContext)
    const [render, setRender] = useState(profile)
    const [lastRender, setLastRender] = useState(false)

    function next() {
        if (!lastRender) {
            setLastRender(true)
            setRender(goals)
        } else {
            console.log('asdasd')
            changePage(Page.HOME)
        }
    }

    return (
        <>
            {render}
        </>
    )
}