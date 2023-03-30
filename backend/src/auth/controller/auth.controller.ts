import {
    Body,
    ConflictException,
    Controller,
    ForbiddenException,
    Get,
    Header,
    HttpCode,
    HttpStatus, Logger, NotFoundException, Patch,
    Post,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import {GetCurrentUserId, GetCurrentUserRefreshToken, } from '../decorators/decorators';
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
import { PasswordChangeDto } from "../dto/password-change.dto";


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
        Logger.log(`/auth/register (POST) email: ${createUserDto.email} isCoach: ${createUserDto.isCoach} password: ${(!!createUserDto.password)}`)
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
        Logger.log(`/auth/refresh (GET)`)
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch) { throw new ForbiddenException('Access denied') }
        await this.userDeleteService.deleteRefreshTokenById(userId, refreshToken);
        const newToken = await this.authTokenService.getNewRefreshToken(userId);
        this.authTokenService.storeRfToken(newToken, res)
        await this.userUpdateService.pushNewRefreshToken(newToken, userId)
            .catch(() => {
                throw new ConflictException('Error while pushing new token')
            });
        return {newToken}
    }

    @UseGuards(RefreshTokenGuard)
    @Header('Content-Type', 'application/json')
    @Get('access')
    async getAccessToken(@Res({passthrough: true}) res: Response, @GetCurrentUserRefreshToken() refreshToken: string, @GetCurrentUserId() userId: number) {
        Logger.log(`/auth/access (GET)`)
        const isUserExist = await this.userCheckService.checkUserById(userId)
        Logger.log(`Trying to get new access token userId: ${userId} user exists: ${isUserExist}`)
        if (!isUserExist) {
            throw new NotFoundException("No user found")
        }
        const acToken = await this.authTokenService.getNewAccessToken(userId, refreshToken);
        this.authTokenService.storeACToken(acToken, res)
        return acToken
    }


    @Roles(RoleEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('admin')
    admin() {
        return 'Szia admin báttya'
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Res({passthrough: true}) res: Response, @GetCurrentUserId() userId: number, @GetCurrentUserRefreshToken() refreshToken: string){
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return this.authService.logOut(userId, refreshToken)
    }

    @UseGuards(AccessTokenGuard)
    @Patch('password')
    changePassword(@Body() passwordChangeDto: PasswordChangeDto, @GetCurrentUserId() userId: number) {
        return this.userUpdateService.updatePassword(passwordChangeDto.oldPassword, passwordChangeDto.newPassword, userId)
    }

}
