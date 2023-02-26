import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards,} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserId, Public,} from '../decorators/decorators';
import {RefreshTokenGuard} from '../guards/refresh-token.guard';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {AuthService} from '../services/auth.service';
import {CreateUserDTO} from '../../user/dto/createUserDTO';
import {Roles} from "../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {AccessTokenGuard} from "../guards/access-token.guard";
import {RolesGuard} from "../guards/role.guard";
import {AuthTokenService} from "../services/auth-token/auth-token.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private authTokenService: AuthTokenService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return req.user;
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDTO) {
        return await this.authService.register(createUserDto);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async getRefreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        return await this.authTokenService.getNewRefreshToken(userId, refreshToken);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('access')
    async getAccessToken(@GetCurrentUser('refreshToken') refreshToken: string, @GetCurrentUserId() userId: number) {
        return await this.authTokenService.getNewAccessToken(userId, refreshToken);
    }


    @Roles(RoleEnum.COACH)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('admin')
    admin() {
        return 'Szia admin báttya'
    }
}
