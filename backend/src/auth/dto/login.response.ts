import {RoleEnum} from "../../Common/Role/utils/roles";
import {ApiProperty} from "@nestjs/swagger";

export class Role {
    @ApiProperty()
    roleId: number;
    @ApiProperty()
    roleName: RoleEnum;
    @ApiProperty()
    changedAt: Date;
}
export class Tokens {
    @ApiProperty()
    accessToken: string;
    @ApiProperty()
    refreshToken: string;
}

export class User {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    roleId: number;
    @ApiProperty()
    changedAt: String;
    @ApiProperty()
    isBlocked: boolean;
    @ApiProperty()
    role: Role;
}




export default class LoginResponse {
    @ApiProperty()
    user: User
    @ApiProperty()
    tokens: Tokens
}
