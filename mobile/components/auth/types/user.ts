import Role from "./role";

export default interface User {
    changedAt: Date,
    email: string,
    isBlocked: boolean,
    roleId: number,
    roles: Role,
    userId: number
}