import {Roles} from "./Roles";

export interface User {
    userId: number;
    email: string;
    roleId: number;
    changedAt: String;
    isBlocked: boolean;
    roles: Roles;
}