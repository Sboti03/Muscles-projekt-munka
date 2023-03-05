export interface Roles {
    roleId: number;
    roleName: RoleEnum;
    changedAt: Date;
}

export enum RoleEnum {
    USER= 'user',
    COACH = 'coach',
    ADMIN = 'admin'
}