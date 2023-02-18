import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {RoleEnum} from "../../Role/utils/roles";
import {ROLES_KEY} from "../../Role/decorators/ roles.decorator";
import {JwtPayload} from "../types/jwt-payload";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        const userPayload = user as JwtPayload
        console.log(user)
        return requiredRoles.some((role) => userPayload.role.roleName.includes(role));
    }
}