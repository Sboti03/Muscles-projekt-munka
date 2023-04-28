export default interface Role {
    changedAt: Date,
    roleId: number,
    roleName: RoleEnum,

}

export enum RoleEnum {
    ADMIN= 'admin',
    USER = 'user',
    COACH = 'coach'

}