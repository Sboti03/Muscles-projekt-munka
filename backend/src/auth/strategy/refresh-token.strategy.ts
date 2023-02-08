import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayload } from "../types/jwt-payload";
import * as express from 'express'


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.RT_SECRET,
            passReqToCallback: true,
        });
    }


    validate(req: express.Request, payload: JwtPayload) {
        const refresh_token = req
            ?.get('authorization')
            ?.replace('Bearer', '')
            .trim();

        if (!refresh_token) throw new ForbiddenException('Refresh token malformed');

        return {
            ...payload,
            refresh_token,
        };
    }
}