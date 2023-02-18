import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards,} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserId, Public,} from '../decorators/decorators';
import {RefreshAuthGuard} from '../guards/jwt-refresh-auth.guard';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {AuthService} from '../services/auth.service';
import {CreateUserDTO} from '../../user/dto/createUserDTO';
import {Roles} from "../../Role/decorators/ roles.decorator";
import {RoleEnum} from "../../Role/utils/roles";
import {JwtAccessGuard} from "../guards/jwt-access.guard";
import {RolesGuard} from "../guards/role.guard";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

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
    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async getRefreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        return await this.authService.getNewRefreshToken(userId, refreshToken);
    }

    @UseGuards(RefreshAuthGuard)
    @Post('access')
    async getAccessToken(@GetCurrentUser('refreshToken') refreshToken: string, @GetCurrentUserId() userId: number) {
        return await this.authService.getNewAccessToken(userId, refreshToken);
    }


    @Roles(RoleEnum.COACH)
    @UseGuards(JwtAccessGuard, RolesGuard)
    @Get('admin')
    admin() {
        return 'Szia admin báttya'
    }
}
