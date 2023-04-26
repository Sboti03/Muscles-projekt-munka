import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload';
import * as express from 'express';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(req: express.Request, payload: JwtPayload): {
        refreshToken: any;
        email: string;
        sub: number;
        role: import("../../Common/Role/utils/roles").RoleEnum;
        profileId: number;
    };
    private static extractJWT;
}
export {};
