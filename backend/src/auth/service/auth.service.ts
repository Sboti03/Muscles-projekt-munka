import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types/jwt-payload';
import { Tokens } from '../types/token';

@Injectable()
export class AuthService {


    constructor(private jwtService: JwtService) {}

    validateUser(email: string, password: string) {
        return {
            user: {}
        }
    }


    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        };
        
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.AT_SECRET,
                expiresIn: process.env.AT_EXPIRES,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.RT_SECRET,
                expiresIn: process.env.RT_EXPIRES,
            },),
        ]);

        return {
            accessToken,
            refreshToken
        };
    }


}
