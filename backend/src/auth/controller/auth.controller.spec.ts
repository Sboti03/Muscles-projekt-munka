import {AuthController} from "./auth.controller";
import {AuthService} from "../services/auth.service";
import {AuthTokenService} from "../services/auth-token/auth-token.service";
import {UserDeleteService} from "../../user/services/user-delete/user-delete.service";
import {UserCheckService} from "../../user/services/user-check/user-check.service";
import {Test, TestingModule} from "@nestjs/testing";
import {UserCreateService} from "../../user/services/user-create/user-create.service";
import {PrismaError} from "prisma-error-enum";
import {UserModule} from "../../user/user.module";
import {JwtService} from "@nestjs/jwt";
import {AccessTokenStrategy} from "../strategy/access-token.strategy";
import {LocalStrategy} from "../strategy/local.strategy";
import {RefreshTokenStrategy} from "../strategy/refresh-token.strategy";
import {RolesGuard} from "../guards/role.guard";
import {ProfileGetService} from "../../profile/services/profile-get/profile-get.service";
import {ForbiddenException, NotFoundException} from "@nestjs/common";
import {Roles} from "../../Common/Role/utils/roles";
import {PrismaService} from "../../Common/utils/prirsma.service";
import {Prisma} from "@prisma/client";
import {CreateUserDto} from "../../user/dto/createUser.dto";
import * as process from "process";
import {Tokens} from "../types/token";

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    let authTokenService: AuthTokenService;
    let userCheckService: UserCheckService;
    let userDeleteService: UserDeleteService;
    let userCreateService: UserCreateService;
    let accessTokenStrategy: AccessTokenStrategy;
    let refreshTokenStrategy: RefreshTokenStrategy;
    let prismaService: PrismaService;


    const simpleUserDto: CreateUserDto = {
        email: 'asd@asd.com',
        password: 'asd',
        isCoach: false
    }

    const simpleUser: Prisma.usersCreateInput = {
        email: simpleUserDto.email,
        password: simpleUserDto.password,
        role: {
            connect: {
                roleId: Roles.USER.roleId
            },
        },
        refreshTokens: [],
        profileData: {
            create: {
                goal: {
                    create: [{}]
                },
            }
        }
    }

    const {password, refreshTokens, ...simpleUserWithoutPassword} = simpleUser

    const response = {
        cookie: jest.fn(),
    }

    beforeEach(async () => {
        jest.resetModules()
        process.env.AT_SECRET = 'test'
        process.env.AT_EXPIRES = '1h'
        process.env.RT_SECRET = 'test1'
        process.env.RT_EXPIRES = '1h'
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
            providers: [AuthService, JwtService, AccessTokenStrategy, LocalStrategy, RefreshTokenStrategy, RolesGuard, AuthTokenService, ProfileGetService],
            controllers: [AuthController],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
        authTokenService = module.get<AuthTokenService>(AuthTokenService);
        userCheckService = module.get<UserCheckService>(UserCheckService);
        userDeleteService = module.get<UserDeleteService>(UserDeleteService);
        userCreateService = module.get<UserCreateService>(UserCreateService);
        accessTokenStrategy = module.get<AccessTokenStrategy>(AccessTokenStrategy);
        refreshTokenStrategy = module.get<RefreshTokenStrategy>(RefreshTokenStrategy);
        prismaService = module.get<PrismaService>(PrismaService);

    });
    const tokens: Tokens = {
        accessToken: 'asd',
        refreshToken: 'asdasd'
    }
    describe('register', () => {
        it('should throw 403 because email is already in use', async () => {
            jest.spyOn(userCreateService, 'createUser').mockImplementation(() => {
                throw new Object({code: PrismaError.UniqueConstraintViolation})
            })
            const result = controller.register({
                email: 'asd@asd.com', isCoach: false, password: 'asdf'
            }, null)
            await expect(result).rejects.toBeInstanceOf(ForbiddenException)
        })
        it('should create a user', async () => {
            prismaService.users.create = jest.fn().mockImplementationOnce((args: Prisma.usersCreateArgs) => args.data)
            prismaService.users.update = jest.fn().mockImplementationOnce((args: Prisma.usersUpdateArgs) => {
            })
            jest.spyOn(authTokenService, 'getTokens').mockImplementationOnce(() => Promise.resolve(tokens))
            const result = await controller.register(simpleUserDto, response as any)
            expect(result).toEqual({user: simpleUserWithoutPassword, tokens})
        })
    })


    describe('getAccessToken', () => {
        it('should not found a user', async () => {
            prismaService.users.findUnique = jest.fn().mockImplementationOnce(() => null)
            const result = controller.getAccessToken(response as any, '', 1)
            await expect(result).rejects.toBeInstanceOf(NotFoundException)
        });

        it('should found a blocked user', async () => {
            prismaService.users.findUnique = jest.fn().mockImplementationOnce(() => ({isBlocked: true}))
            const result = controller.getAccessToken(response as any, '', 1)
            await expect(result).rejects.toBeInstanceOf(NotFoundException)
        })

        it('should found a user', async () => {
            prismaService.users.findUnique = jest.fn().mockImplementationOnce(() => ({isBlocked: false}))
            authTokenService.getNewAccessToken = jest.fn().mockImplementationOnce(() => true)
            const result = await controller.getAccessToken(response as any, '', 1)
            expect(result).toEqual(true)

        });

        it('should found a user with wrong refreshToken', async () => {
            jest.spyOn(userCheckService, 'checkUserById').mockImplementation(()=> Promise.resolve(true))
            jest.spyOn(userCheckService, 'checkRefreshToken').mockImplementation(() => Promise.resolve(false))
            const result = controller.getAccessToken(response as any, 'asd', 1)
            await expect(result).rejects.toBeInstanceOf(ForbiddenException)
        })


        it('should call checkRefreshToken', async () => {
            prismaService.users.findUnique = jest.fn().mockImplementationOnce(() => ({isBlocked: false}))
            jest.spyOn(userCheckService, 'checkRefreshToken').mockImplementationOnce(() => Promise.resolve(true))
            jest.spyOn(authTokenService, 'getTokens').mockImplementationOnce(() => Promise.resolve({
                accessToken: 'asd',
                refreshToken: 'asdasd'
            }))
            const checkRefreshToken = jest.spyOn(userCheckService, 'checkRefreshToken')
            const result = await controller.getAccessToken(response as any, 'asd', 1)
            expect(checkRefreshToken).toBeCalledWith('asd', 1)
        })

        it('should return an accessToken', async () => {
            jest.spyOn(userCheckService, 'checkUserById').mockImplementation(()=> Promise.resolve(true))
            jest.spyOn(authTokenService, 'getNewAccessToken').mockImplementation(()=> Promise.resolve(tokens.accessToken))
            const result = await controller.getAccessToken(response as any, 'asd', 1)
            expect(result).toEqual(tokens.accessToken)
        });


    })


})