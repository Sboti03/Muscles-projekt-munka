import { ExecutionContext, Injectable, CanActivate  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {RoleEnum} from "../../Role/utils/roles";
import {ROLES_KEY} from "../../Role/decorators/ roles.decorator";

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {
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
