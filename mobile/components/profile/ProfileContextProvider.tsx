import {PropsWithChildren, useState} from "react";
import ProfileContext, {Profile, ProfileContextValue} from "./ProfileProvider";

export default function ProfileContextProvider({children}: PropsWithChildren) {
    const [profile, setProfile] = useState<Profile | undefined>(undefined)
    const profileContextValue: ProfileContextValue = {
        profile: undefined,
        updateProfile: (profile:Profile) => {
            setProfile(profile)
        },
        deleteProfileOnLogout: () => {
            setProfile(undefined)
        }
    }

    setProfile({...profile, birthDay: new Date()})

    return(<ProfileContext.Provider value={profileContextValue}>
        {children}
    </ProfileContext.Provider>)
}