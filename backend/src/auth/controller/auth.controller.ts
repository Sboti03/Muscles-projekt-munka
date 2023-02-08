import { Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from '../decorators/decorators';
import { RefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Tokens } from '../types/token';

@Controller('auth')
export class AuthController {


    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return req.user
    }

    @Post('register')
    register() {

    }


    @Public()
    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string): Promise<Tokens> {
        return
    }

}
