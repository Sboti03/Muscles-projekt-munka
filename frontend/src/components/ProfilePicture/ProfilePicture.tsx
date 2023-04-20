import styles from './ProfilePicture.module.css'
import {useMemo, useState} from "react";
import {SIZE} from "../UserCoach/UserProfileDataView/UserProfileDataView";
import {Avatar} from "@mui/joy";

export default function ProfilePicture(props: {profileId?: number, size?: number, clickable: boolean, refresh?: number}) {
    const {profileId, refresh} = props



    const size = useMemo(()=> {
        if (props.size) {
            return props.size
        }
        return 100
    }, [props.size])

    return (
        <div className={`${styles.border} ${props.clickable ? styles.borderHover : ''}`}>
            <Avatar key={props.refresh ? props.refresh : 1} sx={{
                "--Avatar-size": `${size}px`
            }} src={`/api/profile/pic/${profileId ? profileId : 'me'}`} alt="profile picture"/>
        </div>
    )
}