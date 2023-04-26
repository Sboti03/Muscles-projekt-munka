import { profileData, users, roles } from "@prisma/client";
declare class role implements roles {
    changedAt: Date;
    roleId: number;
    roleName: string;
}
declare class user implements users {
    changedAt: Date;
    email: string;
    isBlocked: boolean;
    password: string;
    roleId: number;
    userId: number;
    refreshTokens: string[];
    role: role;
}
export default class AllProfileResponse implements profileData {
    birthDay: Date | null;
    changedAt: Date;
    firstName: string;
    height: number | null;
    lastName: string | null;
    male: boolean;
    profileId: number;
    profilePicPath: string;
    registrationDate: Date;
    userId: number;
    user: user;
}
export {};
