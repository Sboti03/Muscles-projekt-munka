import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtService} from '@nestjs/jwt'
import { RefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  providers: [AuthService, JwtService, AccessTokenStrategy, LocalStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthModule]
})
export class AuthModule {}
