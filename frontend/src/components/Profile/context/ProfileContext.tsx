import {createContext} from "react";
import {ProfileData} from "../data/ProfileData";

interface Value {
    profileData: ProfileData,
    fetchProfileData: (profileId?: number)=>Promise<ProfileData | undefined>
    setProfileData: ()=> void
}

export const ProfileContext = createContext<Value>(null as any)
export default ProfileContext