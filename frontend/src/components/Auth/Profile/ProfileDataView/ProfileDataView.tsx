import useFetch, {Methods, singleFetch} from "../../../utils/Fetch";
import {Button, CircularProgress, Input} from "@mui/joy";
import {ProfileResponse} from "../data/ProfileResponse";
import React, {useContext, useEffect, useState} from "react";
import {ProfileData} from "../data/ProfileData";
import DatePicker from 'react-date-picker'
import styles from './ProfileDataView.module.css'
import {normalizeDate} from "../../../DayInfo/DayInfoContextProvider";
import NavigatorContext from "../../../Navigator/NavigatorContext";

export default function ProfileDataView() {
    const {response, error} = useFetch<ProfileResponse>('api/profile', Methods.GET)
    const {setPrevPage} = useContext(NavigatorContext)
    const [profileData, setProfileData] = useState<ProfileData>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (response) {
            setProfileData(response)
            setIsLoading(false)
        }
    }, [response])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const {error, response} = await singleFetch('/api/profile/update', Methods.PATCH, {
            firstName: profileData?.firstName,
            lastName: profileData?.lastName,
            birthDay: normalizeDate(profileData?.birthDay),
            height: profileData?.height
        })

        if (error) {
            //TODO handle error
            console.log(profileData?.birthDay)
            console.log(error)
        } else {
            console.log(response)
        }

        setIsLoading(false)

    }

    return (
        <>
            <Button type="button" onClick={()=> setPrevPage()}>Back</Button>
            {isLoading && <CircularProgress />}
            <div className={styles.container}>
                <form onSubmit={handleSubmit} >
                    <div>
                        <Input type="text" name="firstName" value={profileData?.firstName}
                               onChange={changeFirstName}
                               placeholder="First name"/>
                    </div>
                    <div>
                        <Input type="text" name="lastName" value={profileData?.lastName}
                               onChange={changeLastName}
                               placeholder="Last name"/>
                    </div>
                    <div>
                        <Input type="number" name="height" value={profileData?.height}
                               onChange={changeHeight}
                               placeholder="Height in cm"/>
                    </div>
                    <div>
                        <DatePicker value={profileData?.birthDay} onChange={(value: Date)=> setProfileData({...profileData, birthDay: value})}/>
                    </div>
                    <div>
                        <Input contentEditable={false} value={response?.registrationDate} />
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </div>
        </>
    )

    function changeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setProfileData({...profileData, firstName: event.target.value})
    }

    function changeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        setProfileData({...profileData, lastName: event.target.value})
    }

    function changeHeight(event: React.ChangeEvent<HTMLInputElement>) {
        setProfileData({...profileData, height: event.target.valueAsNumber})
    }

}