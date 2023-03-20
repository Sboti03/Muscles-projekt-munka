import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import './ProfileBar.css'
import React, {useContext, useState} from "react";
import NavigatorContext, {Page} from "../../Navigator/NavigatorContext";

import ProfileDataEditSelector from "../../Profile/ProfileDataEditSelector";
import {Drawer} from "@mui/material";

export default function ProfileBar() {
    const {changePage} = useContext(NavigatorContext)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <>
            <button onClick={()=> setIsDrawerOpen(!isDrawerOpen)} className="circle-border"><FontAwesomeIcon icon={faUser} /></button>
            <>
                <Drawer
                    anchor={"left"}
                    open={isDrawerOpen}
                    onClose={()=> setIsDrawerOpen(false)}

                >
                    <ProfileDataEditSelector />
                </Drawer>
            </>
        </>
    )
}