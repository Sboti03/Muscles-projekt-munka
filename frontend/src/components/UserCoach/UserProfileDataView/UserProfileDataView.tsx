import {normalizeDate} from "../../DayInfo/context/DayInfoContextProvider";
import {ProfileData} from "../data/SearchResponse";
import {useMemo} from "react";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import profileData from "../../Profile/data/ProfileData";
export type SIZE = 'sm' | 'lg' | 'hg'
export default function UserProfileDataView(props: {profileData: ProfileData, size?: SIZE}) {
    const {lastName, firstName, birthDay, registrationDate, userId} = props.profileData


    const sizedFirstNameLastName = useMemo(()=> {
        switch (props.size) {
            case 'sm':
                return <div><b>{firstName} {lastName}</b></div>
            case 'lg':
                return <h3>{firstName} {lastName}</h3>
            case 'hg':
                return <h1>{firstName} {lastName}</h1>

        }
        return  <h1>{firstName} {lastName}</h1>
    }, [])

    return (
        <>
            <ProfilePicture clickable={false} profileId={userId} />
            {sizedFirstNameLastName}
            <div>{getAge(birthDay)} yo</div>
            <div>Registered since: {normalizeDate(registrationDate)}</div>
        </>
    )
}
export function getAge(birthDate?: Date) {
    if (birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}
