import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import './ProfileBar.css'
import {Button} from "@mui/joy";
export default function ProfileBar() {
    return (
        <>
            <button className="circle-border"><FontAwesomeIcon icon={faUser} /></button>
        </>
    )
}