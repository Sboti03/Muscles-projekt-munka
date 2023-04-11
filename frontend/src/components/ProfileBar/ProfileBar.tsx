import './ProfileBar.css'
import React, {useContext, useState} from "react";

import ProfileDataEditSelector from "../Profile/ProfileDataEditSelector";
import {Drawer} from "@mui/material";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export default function ProfileBar(props: {coachMode?: boolean}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <>
            <button onClick={()=> setIsDrawerOpen(!isDrawerOpen)} className="profilePic"><ProfilePicture clickable={true} size={75}/></button>
            <>
                <Drawer
                    anchor={props.coachMode ? "right" : "left"}
                    open={isDrawerOpen}
                    onClose={()=> setIsDrawerOpen(false)}

                >
                    <ProfileDataEditSelector coachMode={props.coachMode} />
                </Drawer>
            </>
        </>
    )
}