import {RoleType} from "../../Role/utils/roles";

export type JwtPayload = {
    email: string;
    sub: number;
    role: RoleType;
  };