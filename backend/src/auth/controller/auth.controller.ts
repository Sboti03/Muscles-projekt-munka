import {
    Body,
    ConflictException,
    Controller,
    ForbiddenException,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserId, GetCurrentUserRefreshToken, Public,} from '../decorators/decorators';
import {RefreshTokenGuard} from '../guards/refresh-token.guard';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {AuthService} from '../services/auth.service';
import {CreateUserDto} from '../../user/dto/createUser.dto';
import {Roles} from "../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {AccessTokenGuard} from "../guards/access-token.guard";
import {RolesGuard} from "../guards/role.guard";
import {AuthTokenService} from "../services/auth-token/auth-token.service";
import LoginDto from "../dto/login.dto";
import {Response} from "express";
import {UserCheckService} from "../../user/services/user-check/user-check.service";
import {UserDeleteService} from "../../user/services/user-delete/user-delete.service";
import {UserUpdateService} from "../../user/services/user-update/user-update.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private authTokenService: AuthTokenService,
                private userCheckService:UserCheckService,
                private userDeleteService:UserDeleteService,
                private userUpdateService: UserUpdateService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req, @Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response) {
        const tokens = req.user.tokens
        this.authTokenService.storeTokens(tokens, res)
        return req.user;
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
        const userData = await this.authService.register(createUserDto);
        const tokens = userData.tokens
        this.authTokenService.storeTokens(tokens, res)
        return userData
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    async getRefreshToken(@Res({passthrough: true}) res: Response, @GetCurrentUserId() userId: number, @GetCurrentUserRefreshToken() refreshToken: string) {
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch) { throw new ForbiddenException('Access denied') }
        await this.userDeleteService.deleteRefreshTokenById(userId, refreshToken);
        const newToken = await this.authTokenService.getNewRefreshToken(userId, refreshToken);
        this.authTokenService.storeRfToken(newToken, res)
        const pushRes = await this.userUpdateService.pushNewRefreshToken(newToken, userId)
            .catch(reason => {
                throw new ConflictException('Error while pushing new token')
            });
        return {newToken}
    }

    @UseGuards(RefreshTokenGuard)
    @Header('Content-Type', 'application/json')
    @Get('access')
    async getAccessToken(@Res({passthrough: true}) res: Response, @GetCurrentUserRefreshToken() refreshToken: string, @GetCurrentUserId() userId: number) {
        const acToken = await this.authTokenService.getNewAccessToken(userId, refreshToken);
        this.authTokenService.storeACToken(acToken, res)
        return acToken
    }


    @Roles(RoleEnum.COACH)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('admin')
    admin() {
        return 'Szia admin báttya'
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@GetCurrentUserId() userId: number, @GetCurrentUserRefreshToken() refreshToken: string){
        return this.authService.logOut(userId)
    }

}
