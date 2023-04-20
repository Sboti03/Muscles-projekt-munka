import {Methods, singleFetch} from "../../utils/Fetch";
import {Button, FormControl, FormLabel, Input, Radio, RadioGroup} from "@mui/joy";
import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import initProfileData, {ProfileData, ProfileDataToSend} from "../data/ProfileData";
import DatePicker from 'react-date-picker'
import styles from './ProfileDataView.module.css'
import {normalizeDate} from "../../DayInfo/context/DayInfoContextProvider";
import NavigatorContext from "../../Navigator/NavigatorContext";
import LoadingManager from "../../Loading/LoadingManager";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import profileContext from "../context/ProfileContext";
import {getAge} from "../../UserCoach/UserProfileDataView/UserProfileDataView";
import {toast} from "react-toastify";
import PasswordInput from "../../PasswordInput/PasswordInput";

interface Props {
    backBtn: string | undefined,
    saveBtn: string | undefined
    saveBtnAction: Function | undefined
}

export default function ProfileDataView(props: Props) {
    const {setPrevPage, changePage} = useContext(NavigatorContext)
    const [isLoading, setIsLoading] = useState(false)
    const {profileData, setProfileData} = useContext(profileContext)
    const [newProfileData, setNewProfileData] = useState<ProfileData>(initProfileData)
    const [changePasswordMode, setChangePasswordMode] = useState(false)
    const [changePasswordDTO, setChangePasswordDTO] = useState<{
        oldPassword?: string,
        newPassword?: string
    }>({newPassword: '', oldPassword: ''})
    const {t, i18n} = useTranslation()
    useEffect(() => {
        if (profileData) {

            setNewProfileData({
                ...profileData,
                firstName: toEmptyString(profileData.firstName),
                lastName: toEmptyString(profileData.lastName),
                profilePicPath: toEmptyString(profileData.profilePicPath),
                height: toUndefined(profileData.height)
            })
        }
    }, [profileData])

    async function handleChangePassword() {
        if (changePasswordMode) {
            if (!changePasswordDTO.newPassword) {
                toast.error(t('profile.error.password.new'))
                return
            }
            if (!changePasswordDTO.oldPassword) {
                toast.error(t('profile.error.password.new'))
                return
            }
            if (changePasswordDTO.newPassword === changePasswordDTO.oldPassword) {
                toast.error(t('profile.error.password.same'))
                return
            }
            setIsLoading(true)
            const result = await singleFetch('api/auth/password', Methods.PATCH, changePasswordDTO)
            setIsLoading(false)
            if (result.error) {
                if (result.error.statusCode === 404) {
                    toast.error(t('profile.error.password.not-same'))
                }
                return
            }
            if (result.response) {
                toast.info(t('profile.password.successful'))
            }
        }
        setChangePasswordMode(prevState => !prevState)
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
                        <div>
                            <div>
                                <button onClick={handleProfilePicChangeClick} type="button"
                                        className={styles.profilePic}>
                                    <FormControl>
                                        <ProfilePicture clickable={true}/>
                                    </FormControl>
                                </button>
                            </div>
                            {newProfileData.profilePicPath !== '' &&
                                <div>
                                    <Button type="button" onClick={deleteProfilePic} color="danger">Set default</Button>
                                </div>
                            }
                        </div>
                        <FormControl>
                            <FormLabel>{t("profile.firstname")}</FormLabel>
                            <Input type="text" name="firstname" value={newProfileData.firstName}
                                   onChange={changeFirstName}
                                   placeholder={t("profile.firstname")!}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel>{t("profile.lastname")}</FormLabel>
                            <Input type="text" name="lastName" value={newProfileData.lastName}
                                   onChange={changeLastName}
                                   placeholder={t("profile.lastname")!}/>
                        </FormControl>
                    </div>
                    <div className={styles.miniInput}>
                        <FormControl>
                            <FormLabel>{t("profile.height.text")}</FormLabel>
                            <Input type="number" name="height"
                                   value={newProfileData.height ? newProfileData.height.toString() : ''}
                                   onChange={changeHeight}
                                   placeholder={t("profile.height.description")!}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel>{t("profile.gender.text")}</FormLabel>
                            <RadioGroup>
                                <div className="flex gap-2">
                                    <Radio onChange={event => changeGender(event.target.checked, true)}
                                           checked={newProfileData.male} label={t("profile.gender.male")}/>
                                    <Radio onChange={event => changeGender(event.target.checked, false)}
                                           checked={!newProfileData.male} label={t("profile.gender.female")}/>
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel>{t("profile.date-of-birth")}</FormLabel>
                            <DatePicker value={newProfileData.birthDay}
                                        onChange={(value: Date) => setNewProfileData({
                                            ...newProfileData,
                                            birthDay: value
                                        })}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel>{t("profile.registration-date")}</FormLabel>
                            <Input contentEditable={false}
                                   value={newProfileData.registrationDate?.toISOString().split('T')[0]}/>
                        </FormControl>
                    </div>
                    {changePasswordMode &&
                        <>
                            <div>
                                <FormControl>
                                    <FormLabel>{t("profile.password.old")}</FormLabel>
                                    <PasswordInput name="rePassword" placeHolder={t("profile.password.old")}
                                                   value={changePasswordDTO.oldPassword}
                                                   isLoading={isLoading}
                                                   onChange={value => setChangePasswordDTO({
                                                       ...changePasswordDTO,
                                                       oldPassword: value,
                                                   })}/>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl>
                                    <FormLabel>{t("profile.password.new")}</FormLabel>
                                    <PasswordInput name="rePassword" placeHolder={t("profile.password.new")}
                                                   value={changePasswordDTO.newPassword}
                                                   isLoading={isLoading}
                                                   onChange={value => setChangePasswordDTO({
                                                       ...changePasswordDTO,
                                                       newPassword: value,
                                                   })}/>
                                </FormControl>
                            </div>
                        </>
                    }
                    <div>
                        <Button onClick={handleChangePassword} type="button">Change password</Button>
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
        setNewProfileData({...newProfileData, firstName: event.target.value})
    }

    function changeGender(value: boolean, male: boolean) {
        if (male) {
            setNewProfileData({...newProfileData, male: value})
        } else {
            setNewProfileData({...newProfileData, male: !value})
        }
    }

    function changeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        setNewProfileData({...newProfileData, lastName: event.target.value})
    }

    function changeHeight(event: React.ChangeEvent<HTMLInputElement>) {
        setNewProfileData({...newProfileData, height: event.target.valueAsNumber})
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!newProfileData) {
            toast.info(t("profile.error.no-change")!)
            return
        }
        let profileDataToSend: ProfileDataToSend = {}
        if (newProfileData.firstName && profileData.firstName !== newProfileData.firstName) {
            if (newProfileData.firstName.length > 100) {
                toast.error(t("profile.error.firstname.length"))
                return
            }
            profileDataToSend = {...profileDataToSend, firstName: newProfileData.firstName}
        }
        if (newProfileData.lastName && profileData.lastName !== newProfileData.lastName) {
            if (newProfileData.lastName.length > 200) {
                toast.error(t("profile.error.lastname.length"))
                return
            }
            profileDataToSend = {...profileDataToSend, lastName: newProfileData.lastName}
        }
        if (newProfileData.birthDay && profileData.birthDay !== newProfileData.birthDay) {
            const age = getAge(newProfileData.birthDay)
            if (age! <= 12) {
                toast.error(t("profile.error.birth-day.age"))
                return
            }
            profileDataToSend = {...profileDataToSend, birthDay: newProfileData.birthDay}
        }
        if (newProfileData.height && profileData.height !== newProfileData.height) {
            if (newProfileData.height <= 0 || 400 <= newProfileData.height) {
                toast.error(t("profile.error.height"))
                return
            }
            profileDataToSend = {...profileDataToSend, height: newProfileData.height}
        }
        if (newProfileData.male !== undefined && profileData.male !== newProfileData.male) {
            profileDataToSend = {...profileDataToSend, male: newProfileData.male}
        }
        if (Object.keys(profileDataToSend).length === 0) {
            toast.info(t("profile.error.no-change")!)
            if (props.saveBtnAction) {
                props.saveBtnAction()
            }
            return
        }
        setIsLoading(true)
        const {firstName, lastName, birthDay, height, male} = profileDataToSend
        console.log(profileDataToSend)
        const {error, response} = await singleFetch('/api/profile/update', Methods.PATCH, {
            firstName,
            lastName,
            birthDay: normalizeDate(birthDay),
            height,
            male
        })
        if (error) {
            //TODO handle error
            console.log(error)
        } else {
            console.log(response)
        }
        setIsLoading(false)
        setProfileData()
        if (props.saveBtnAction) {
            props.saveBtnAction()
        }
    }

    function handleProfilePicChangeClick() {
        const input = document.createElement('input')
        input.type = 'file'
        input.multiple = false
        input.onchange = ev => {
            if (input.files) {
                console.log(input.files[0])
                handleProfilePicChange(input.files[0]).then()
            }
        }
        input.click()
    }

    async function handleProfilePicChange(file: File) {
        console.log(file)
        const res = await singleFetch('/api/profile/pic/upload', Methods.FILE, {
            file
        })
        if (res.response) {

        }
        console.log(res)
    }


    async function deleteProfilePic() {
        const res = await singleFetch('api/profile/pic', Methods.DELETE)
        if (res.response) {
            // setTimeout(()=> {
            //     reset()
            //
            // }, 1000)
        }
    }
}

export function toEmptyString(value: string | undefined) {
    if (!value) {
        return ""
    }
    return value
}

export function toUndefined(value: any) {
    if (!value) {
        return ''
    }
    return value
}

