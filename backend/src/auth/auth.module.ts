import {LoggerService, Module} from '@nestjs/common';
import {AuthController} from './controller/auth.controller';
import {AuthService} from './services/auth.service';
import {JwtService} from '@nestjs/jwt';
import {AccessTokenStrategy} from './strategy/access-token.strategy';
import {LocalStrategy} from './strategy/local.strategy';
import {RefreshTokenStrategy} from './strategy/refresh-token.strategy';
import {UserModule} from '../user/user.module';
import {RolesGuard} from "./guards/role.guard";
import {AuthTokenService} from './services/auth-token/auth-token.service';
import {ProfileGetService} from "../profile/services/profile-get/profile-get.service";

@Module({
    imports: [UserModule],
    providers: [
        AuthService,
        JwtService,
        AccessTokenStrategy,
        LocalStrategy,
        RefreshTokenStrategy,
        RolesGuard,
        AuthTokenService,
        ProfileGetService,


    ],
    controllers: [AuthController],
    exports: [AuthService, AuthTokenService],
})
export class AuthModule {
}
