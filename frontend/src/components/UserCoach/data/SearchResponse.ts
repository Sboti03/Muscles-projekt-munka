export interface SearchResponse {
    profileId: number
    firstName: string
    lastName: string
    userId: number
    user: User
}

export interface User {
    email: string
    role: Role
}

export interface Role {
    roleName: string
}
export interface ProfileResponse {
    birthDay: string
    firstName: string
    height: number
    lastName: string
    userId: number
    registrationDate: string
}


export interface ProfileData {
    birthDay: Date
    firstName: string
    height: number
    lastName: string
    userId: number
    registrationDate: Date
}


export function convertResponseToData(response: ProfileResponse): ProfileData {
    const {lastName, firstName, userId, height, birthDay, registrationDate} = response
    return {
        firstName,
        lastName,
        birthDay: new Date(birthDay),
        registrationDate: new Date(registrationDate),
        height,
        userId
    }
}