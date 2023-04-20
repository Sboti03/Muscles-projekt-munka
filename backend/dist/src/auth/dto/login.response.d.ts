import { RoleEnum } from "../../Common/Role/utils/roles";
export declare class Role {
    roleId: number;
    roleName: RoleEnum;
    changedAt: Date;
}
export declare class Tokens {
    accessToken: string;
    refreshToken: string;
}
export declare class User {
    userId: number;
    email: string;
    roleId: number;
    changedAt: String;
    isBlocked: boolean;
    role: Role;
}
export default class LoginResponse {
    user: User;
    tokens: Tokens;
}
