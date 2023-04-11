import {createContext} from "react";
import {ProfileData} from "../data/ProfileData";

interface Value {
    profileData: ProfileData,
    fetchProfileData: ()=>void
}

export const ProfileContext = createContext<Value>(null as any)
export default ProfileContext