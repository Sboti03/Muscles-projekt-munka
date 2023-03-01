import { ExecutionContext, Injectable, CanActivate  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {RoleEnum} from "../../Common/Role/utils/roles";
import {ROLES_KEY} from "../../Common/Role/decorators/ roles.decorator";

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;
        return super.canActivate(context);


    }
}