import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayload } from "../types/jwt-payload";
import {Request} from "express";



@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                AccessTokenStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.AT_SECRET,
        });
    }



    async validate(payload: JwtPayload) {
        return payload
    }

    private static extractJWT(req: Request): string | null {
        if (req.cookies && 'accessToken' in req.cookies) {
            return req.cookies.accessToken;
        }
        return null;
    }
}
