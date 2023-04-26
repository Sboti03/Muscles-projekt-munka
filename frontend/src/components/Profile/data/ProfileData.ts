export interface ProfileData {
    firstName: string | undefined
    lastName: string | undefined
    birthDay: Date | undefined
    height: number | undefined
    profilePicPath: string
    male: boolean
    registrationDate: Date
}

export interface ProfileDataToSend {
    firstName?: string
    lastName?: string
    birthDay?: Date
    height?: number
    profilePicPath?: string
    registrationDate?: Date
    male?: boolean
}

const initProfileData: ProfileData = {
    firstName: '',
    profilePicPath: '',
    birthDay: new Date(),
    height: 200,
    lastName: '',
    registrationDate: new Date(),
    male: true
}

export default initProfileData