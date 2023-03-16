import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import './ProfileBar.css'
import {useContext} from "react";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";

export default function ProfileBar() {
    const {changePage} = useContext(NavigatorContext)
    return (
        <>
            <button onClick={()=> changePage(Page.PROFILE_VIEW)} className="circle-border"><FontAwesomeIcon icon={faUser} /></button>
        </>
    )
}