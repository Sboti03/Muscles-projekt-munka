export interface ConnectionRequestResponse {
    accessAll: boolean
    changedAt: string
    coachId: number
    connectionRequestId: number
    requestBy: number
    requestDate: string
    userId: number
}

export interface ConnectionResponse {
    userId: number
    coachId: number
    accessAll: boolean
    connectionId: number
}

interface User {
    email: string
    userId: number
    profileData: ProfileData
}

interface ProfileData {
    birthDay?: Date
    firstName?: string
    height?: number
    lastName?: string
    registrationDate: Date
}

export interface Connection {
    user: User
}

interface UserResponse {
    email: string
    userId: number
    profileData: ProfileDataResponse
}

interface ProfileDataResponse {
    birthDay: string | null
    firstName: string | null
    height: number | null
    lastName: string | null
    registrationDate: string
}