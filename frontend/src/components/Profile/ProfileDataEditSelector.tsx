import {Button} from "@mui/joy";
import React, {useContext, useEffect} from "react";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import AuthContext from "../Auth/AuthContext";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import useFetch, {Methods} from "../utils/Fetch";
import {ProfileResponse} from "./data/ProfileResponse";
import {getAge} from "../UserCoach/UserProfileDataView/UserProfileDataView";
import ProfileContext from "./context/ProfileContext";

export default function ProfileDataEditSelector(props: {coachMode?: boolean}) {
    const {changePage, setPrevPage} = useContext(NavigatorContext)
    const {logout, user} = useContext(AuthContext)
    const {profileData} = useContext(ProfileContext)



    if (props.coachMode) {
        return (
            <div className="profile-bar-container">
                <ProfilePicture clickable={false} size={75}/>
                <div>{profileData.firstName} {profileData.lastName}</div>
                <div>{getAge(profileData.birthDay)} yo</div>
                <div><Button onClick={()=> changePage(Page.PROFILE_DATA)}>Personal information</Button></div>
                {/*<div><Button onClick={()=> changePage(Page.GOALS)}>Goals</Button></div>*/}
                {/*<div><Button onClick={()=> changePage(Page.RESULTS)}>Results</Button></div>*/}
                <div><Button color="danger" onClick={logout}>Logout</Button></div>
            </div>
        )
    }

    return (
        <div className="profile-bar-container">
            <ProfilePicture clickable={false} size={75}/>
            <div>{profileData.firstName} {profileData.lastName}</div>
            <div>{getAge(profileData.birthDay)} yo</div>
            <div><Button onClick={()=> changePage(Page.PROFILE_DATA)}>Personal information</Button></div>
            <div><Button onClick={()=> changePage(Page.GOALS)}>Goals</Button></div>
            <div><Button onClick={()=> changePage(Page.USER_COACH)}>Coach</Button></div>
            <div><Button onClick={()=> changePage(Page.RESULTS)}>Results</Button></div>
            <div><Button color="danger" onClick={logout}>Logout</Button></div>
        </div>
    )
}