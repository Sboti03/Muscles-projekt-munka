export interface ProfileData {
    firstName: string
    lastName: string
    birthDay: Date
    height: number
    profilePicPath: string
    registrationDate: Date
}

export interface ProfileDataToSend {
    firstName?: string
    lastName?: string
    birthDay?: Date
    height?: number
    profilePicPath?: string
    registrationDate?: Date
}

const initProfileData: ProfileData = {
    firstName: '',
    profilePicPath: '',
    birthDay: new Date(),
    height: 200,
    lastName: '',
    registrationDate: new Date()
}

export default initProfileData