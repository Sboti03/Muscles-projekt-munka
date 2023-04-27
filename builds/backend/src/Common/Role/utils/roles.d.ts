export declare const Roles: {
    USER: {
        roleId: number;
        roleName: string;
    };
    COACH: {
        roleId: number;
        roleName: string;
    };
    ADMIN: {
        roleId: number;
        roleName: string;
    };
};
export type RoleType = {
    roleId: number;
    roleName: string;
};
export declare enum RoleEnum {
    USER = "user",
    COACH = "coach",
    ADMIN = "admin"
}
