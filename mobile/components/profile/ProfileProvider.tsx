import React from "react";

export interface ProfileContextValue {
    profile: Profile | undefined,
    updateProfile: (profile: Profile) => void,
    deleteProfileOnLogout: () => void
}


export interface Profile {
    firstName?: string,
    lastName?: string,
    birthDay?:  Date,
    height?: number
}
const ProfileContext = React.createContext<ProfileContextValue>(null as any)
export default ProfileContext