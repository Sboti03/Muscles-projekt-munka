import useFetch, {Methods, singleFetch} from "../../utils/Fetch";
import {Button, FormControl, FormLabel, Input} from "@mui/joy";
import {ProfileResponse} from "../data/ProfileResponse";
import React, {useContext, useEffect, useState} from "react";
import {ProfileData} from "../data/ProfileData";
import DatePicker from 'react-date-picker'
import styles from './ProfileDataView.module.css'
import {normalizeDate} from "../../DayInfo/DayInfoContextProvider";
import NavigatorContext from "../../Navigator/NavigatorContext";
import LoadingManager from "../../Loading/LoadingManager";

interface Props {
    backBtn: string | undefined,
    saveBtn: string | undefined
    saveBtnAction: Function | undefined
}

export default function ProfileDataView(props: Props) {
    const {response, error} = useFetch<ProfileResponse>('api/profile', Methods.GET)
    const {setPrevPage} = useContext(NavigatorContext)
    const [profileData, setProfileData] = useState<ProfileData>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (response) {
            if (response.birthDay) {
                setProfileData({...response, birthDay: new Date(response.birthDay)})
            } else {
                setProfileData({...response, birthDay: new Date()})

            }
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
        if (props.saveBtnAction) {
            props.saveBtnAction()
        }
        setIsLoading(false)

    }

    return (
        <LoadingManager isLoading={isLoading} fullCenter={true}>
            {props.backBtn &&
                <div className={styles.btn}>
                    <Button type="button" onClick={() => setPrevPage()}>{props.backBtn}</Button>
                </div>
            }
            <div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input type="text" name="firstName" value={profileData?.firstName}
                                   onChange={changeFirstName}
                                   placeholder="First name"/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel>Last name</FormLabel>
                            <Input type="text" name="lastName" value={profileData?.lastName}
                                   onChange={changeLastName}
                                   placeholder="Last name"/>
                        </FormControl>
                    </div>
                    <div className={styles.miniInput}>
                        <FormControl>
                            <FormLabel>Height</FormLabel>
                            <Input type="number" name="height" value={profileData?.height}
                                  onChange={changeHeight}
                                  placeholder="Height in cm"/>
                        </FormControl>
                    </div>
                    <div>
                       <FormControl>
                           <FormLabel>Date of birth</FormLabel>
                           <DatePicker value={profileData?.birthDay}
                                       onChange={(value: Date) => setProfileData({...profileData, birthDay: value})}/>
                       </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel>Registration date</FormLabel>
                            <Input contentEditable={false} value={response?.registrationDate.split('T')[0]}/>
                        </FormControl>
                    </div>
                    {props.saveBtn &&
                        <div className={styles.btn}>
                            <Button type="submit">{props.saveBtn}</Button>
                        </div>
                    }
                </form>
            </div>
        </LoadingManager>
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