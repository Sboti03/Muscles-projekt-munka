import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtPayload} from "../types/jwt-payload";

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const {user} = context.switchToHttp().getRequest();
        const userPayload = user as JwtPayload
        return !(!userPayload.profileId || userPayload.profileId === -1);

    }
}