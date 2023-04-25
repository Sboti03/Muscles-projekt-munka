import {profileData, users, roles} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";



class role implements roles {
    @ApiProperty()
    changedAt: Date;
    @ApiProperty()
    roleId: number;
    @ApiProperty()
    roleName: string;
}
class user implements users {
    @ApiProperty()
    changedAt: Date;
    @ApiProperty()
    email: string;
    @ApiProperty()
    isBlocked: boolean;
    @ApiProperty()
    password: string;
    @ApiProperty()
    roleId: number;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    refreshTokens: string[];
    @ApiProperty()
    role: role
}



export default class AllProfileResponse implements profileData{
    @ApiProperty()
    birthDay: Date | null;
    @ApiProperty()
    changedAt: Date;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    height: number | null;
    @ApiProperty()
    lastName: string | null;
    @ApiProperty()
    male: boolean;
    @ApiProperty()
    profileId: number;
    @ApiProperty()
    profilePicPath: string;
    @ApiProperty()
    registrationDate: Date;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    user: user

}