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
            handleProfileDataSet()
        }
    }, [user])

    async function fetchProfileData(profileId?: number): Promise<ProfileData | undefined> {
        const result = await singleFetch<ProfileResponse>(`/api/profile/${profileId ? `search/id/${profileId}` : ''}`, Methods.GET)
        if (result.response) {
            let birthDay = new Date()
            let regDate = new Date()
            if (result.response.birthDay) {
                birthDay = new Date(result.response.birthDay)
            }
            if (result.response.registrationDate) {
                regDate = new Date(result.response.registrationDate)
            }
            return ({...result.response, birthDay: birthDay, registrationDate: regDate})
        }
    }


    async function handleProfileDataSet() {
        const result = await fetchProfileData()
        if (result) {
            setProfileData(result)
        }
    }


    return (
        <ProfileContext.Provider value={{
            profileData,
            fetchProfileData,
            setProfileData: handleProfileDataSet,
        }}>{props.children}</ProfileContext.Provider>
    )
}