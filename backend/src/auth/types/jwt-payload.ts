import {RoleType} from "../../Common/Role/utils/roles";

export type JwtPayload = {
    email: string;
    sub: number;
    role: RoleType;
    profileId: number;
  };