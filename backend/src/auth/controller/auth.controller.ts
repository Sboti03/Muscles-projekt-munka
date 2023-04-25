import {
    Body,
    ConflictException,
    Controller,
    ForbiddenException,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Patch,
    Post,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import {GetCurrentUserId, GetCurrentUserRefreshToken,} from '../decorators/decorators';
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
import {PasswordChangeDto} from "../dto/password-change.dto";
import {ApiOkResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import LoginResponse from "../dto/login.response";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private authTokenService: AuthTokenService,
                private userCheckService: UserCheckService,
                private userDeleteService: UserDeleteService,
                private userUpdateService: UserUpdateService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOkResponse({status: 200, type: LoginResponse})
    @ApiResponse({status: 403, description: 'No user found'})
    @ApiResponse({status: 423, description: 'User is blocked'})
    @ApiResponse({status: 400, description: 'Wrong post body'})
    @HttpCode(200)
    login(@Req() req, @Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response) {
        Logger.log(`/auth/login (POST) email: ${loginDto.email} password: ********`)
        const tokens = req.user.tokens
        this.authTokenService.storeTokens(tokens, res)
        return req.user;
    }

    @Post('register')
    @HttpCode(201)
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
    async getRefreshToken(@Res({passthrough: true}) res: Response, @GetCurrentUserId() userId: number, @GetCurrentUserRefreshToken() refreshToken: string) {
        Logger.log(`/auth/refresh (GET) userId: ${userId}`)
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch) {
            Logger.log(`Access denied for userId: ${userId} refreshToken: ${refreshToken}`)
            throw new ForbiddenException('Access denied')
        }
        await this.userDeleteService.deleteRefreshTokenById(userId, refreshToken);
        const newToken = await this.authTokenService.getNewRefreshToken(userId);
        this.authTokenService.storeRfToken(newToken, res)
        await this.userUpdateService.pushNewRefreshToken(newToken, userId)
            .catch(() => {
                Logger.log(`Error while pushing new token userId: ${userId}`)
                throw new ConflictException('Error while pushing new token')
            });
        Logger.log(`New token for userId: ${userId}`)
        return {newToken}
    }

    @UseGuards(RefreshTokenGuard)
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
        return {newToken: acToken}
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Res({passthrough: true}) res: Response, @GetCurrentUserId() userId: number, @GetCurrentUserRefreshToken() refreshToken: string) {
        Logger.log(`/auth/logout (GET) userId: ${userId}`)
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return this.authService.logOut(userId, refreshToken)
    }

    @UseGuards(AccessTokenGuard)
    @Patch('password')
    async changePassword(@Res({passthrough: true}) res: Response, @Body() passwordChangeDto: PasswordChangeDto, @GetCurrentUserId() userId: number) {
        Logger.log(`/auth/password (PATCH) userId: ${userId}`)
        await this.userUpdateService.updatePassword(passwordChangeDto.oldPassword, passwordChangeDto.newPassword, userId)
        const newToken = await this.authTokenService.getNewRefreshToken(userId);
        this.authTokenService.storeRfToken(newToken, res)
        await this.userUpdateService.pushNewRefreshToken(newToken, userId)
            .catch(() => {
                throw new ConflictException('Error while pushing new token')
            });
        Logger.log(`New token for userId: ${userId}`)
        return {newToken}
    }

}
