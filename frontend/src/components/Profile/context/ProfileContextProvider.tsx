import {PropsWithChildren, useContext, useEffect, useState} from "react";
import ProfileContext from "./ProfileContext";
import initProfileData, {ProfileData} from "../data/ProfileData";
import {Methods, singleFetch} from "../../utils/Fetch";
import {ProfileResponse} from "../data/ProfileResponse";
import AuthContext from "../../Auth/AuthContext";

export function ProfileContextProvider(props: PropsWithChildren) {
    const [profileData, setProfileData] = useState<ProfileData>(initProfileData)
    const {user} = useContext(AuthContext)

    useEffect(()=> {
        if (user) {
            fetchProfileData().then()
        }
    }, [user])

    async function fetchProfileData() {
        const result = await singleFetch<ProfileResponse>('/api/profile/', Methods.GET)
        if (result.response) {
            let birthDay = new Date()
            let regDate = new Date()
            if (result.response.birthDay) {
                birthDay = new Date(result.response.birthDay)
            }
            if (result.response.registrationDate) {
                regDate = new Date(result.response.registrationDate)
            }
            setProfileData({...result.response, birthDay: birthDay, registrationDate: regDate})
        }
    }


    return (
        <ProfileContext.Provider value={{
            profileData,
            fetchProfileData
        }}>{props.children}</ProfileContext.Provider>
    )
}