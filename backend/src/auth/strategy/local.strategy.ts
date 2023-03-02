import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import {CreateUserDto} from "../../user/dto/createUser.dto";
import LoginDto from "../dto/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(request: Request, email: string, password: string) {
    const contextId = ContextIdFactory.getByRequest(request);
    
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const userData: LoginDto = {
      password,
      email
    }
    const {user, tokens} = await authService.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException();
   }
    return {
      user: user,
      tokens: tokens
    };
  }
}
