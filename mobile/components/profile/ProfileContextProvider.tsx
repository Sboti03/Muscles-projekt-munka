import {PropsWithChildren, useState} from "react";
import ProfileContext, {Profile, ProfileContextValue} from "./ProfileProvider";
import profileProvider from "./ProfileProvider";

export default function ProfileContextProvider({children}: PropsWithChildren) {
    const [profile, setProfile] = useState<Profile>({})
    const profileContextValue: ProfileContextValue = {
        profile: profile,
        updateProfile: (profile:Profile) => {
                    setProfile(profile)
        },

        deleteProfileOnLogout: () => {
            setProfile({})
        }
    }


    return(<ProfileContext.Provider value={profileContextValue}>
        {children}
    </ProfileContext.Provider>)
}