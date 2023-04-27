import { Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload";
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<JwtPayload>;
    private static extractJWT;
}
export {};
