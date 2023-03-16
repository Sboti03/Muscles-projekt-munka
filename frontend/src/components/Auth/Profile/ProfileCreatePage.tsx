import {useState} from "react";
import {ProfileData} from "./data/ProfileData";
import {Input} from "@mui/joy";


export default function ProfileCreatePage() {

    const [profileData, setProfileDate] = useState<ProfileData>({})
    const [dayPickerFocus, setDayPickerFocus] = useState(false)


    return (
        <>
            <form>
                <Input value={profileData.firstName} name="firstName" placeholder="First name" />
                <Input value={profileData.lastName} name="lastName" placeholder="Last name" />

            </form>
        </>
    )
}