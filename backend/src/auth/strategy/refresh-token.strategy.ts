import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload';
import * as express from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                RefreshTokenStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            secretOrKey: process.env.RT_SECRET,
            passReqToCallback: true,
            ignoreExpiration: false
        });
    }

    validate(req: express.Request, payload: JwtPayload) {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken)
            throw new ForbiddenException('Refresh token malformed');

        return {
            ...payload,
            refreshToken,
        };
    }

    private static extractJWT(req: express.Request): string | null {
        if (req.cookies && 'refreshToken' in req.cookies) {
            return req.cookies.refreshToken;
        }
        return null;
    }
}
