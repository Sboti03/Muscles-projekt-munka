import { RoleEnum } from "../../Common/Role/utils/roles";
export type JwtPayload = {
    email: string;
    sub: number;
    role: RoleEnum;
    profileId: number;
};
