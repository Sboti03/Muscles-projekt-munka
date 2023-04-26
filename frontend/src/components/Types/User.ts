import {Role} from "./Role";

export interface User {
    userId: number;
    email: string;
    roleId: number;
    changedAt: String;
    isBlocked: boolean;
    role: Role;
}