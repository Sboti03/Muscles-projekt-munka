import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from '../decorators/decorators';
import { RefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Tokens } from '../types/token';
import {AuthService} from "../services/auth.service";
import {CreateUserDTO} from "../../user/dto/createUserDTO";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return req.user
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDTO) {
        return  await this.authService.register(createUserDto)
    }


    @Public()
    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string): Promise<Tokens> {
        return this.authService.re
    }

}
