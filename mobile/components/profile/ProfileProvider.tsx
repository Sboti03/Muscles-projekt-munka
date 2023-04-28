import React from "react";

export interface ProfileContextValue {
    profile: Profile | undefined,
    updateProfile: (profile: Profile) => void,
    deleteProfileOnLogout: () => void
}


export interface Profile {
    firstName?: string | undefined,
    lastName?: string | undefined,
    birthDay?:  Date | undefined,
    height?: number | undefined
}
export interface ProfileResponse {
    birthDay: undefined | Date,
    changedAt: Date | undefined;
    firstName: string | undefined,
    height: number | undefined
    lastName: string | undefined,
    profileId: number,
    registrationDate: string | Date,
    userId: number,
}

const ProfileContext = React.createContext<ProfileContextValue>(null as any)
export default ProfileContext