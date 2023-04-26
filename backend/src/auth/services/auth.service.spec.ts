import {AuthService} from "./auth.service";
import {JwtService} from "@nestjs/jwt";
import {UserGetService} from "../../user/services/user-get/user-get.service";
import {UserUpdateService} from "../../user/services/user-update/user-update.service";
import {UserCheckService} from "../../user/services/user-check/user-check.service";
import {UserCreateService} from "../../user/services/user-create/user-create.service";
import {AuthTokenService} from "./auth-token/auth-token.service";
import {UserDeleteService} from "../../user/services/user-delete/user-delete.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "../controller/auth.controller";
import {AccessTokenStrategy} from "../strategy/access-token.strategy";
import {RefreshTokenStrategy} from "../strategy/refresh-token.strategy";
import {PrismaService} from "../../Common/utils/prirsma.service";
import {CreateUserDto} from "../../user/dto/createUser.dto";
import {Prisma, roles, users} from "@prisma/client";
import {Roles} from "../../Common/Role/utils/roles";
import process from "process";
import {UserModule} from "../../user/user.module";
import {LocalStrategy} from "../strategy/local.strategy";
import {RolesGuard} from "../guards/role.guard";
import {ProfileGetService} from "../../profile/services/profile-get/profile-get.service";
import LoginDto from "../dto/login.dto";
import {ForbiddenException, HttpException, NotFoundException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {encryptData} from "../../Common/utils/bcrypt";
import * as argon2 from 'argon2'
describe('AuthService', () => {

    let authService: AuthService;
    let authTokenService: AuthTokenService;
    let userCheckService: UserCheckService;
    let userDeleteService: UserDeleteService;
    let userCreateService: UserCreateService;
    let accessTokenStrategy: AccessTokenStrategy;
    let refreshTokenStrategy: RefreshTokenStrategy;
    let prismaService: PrismaService;
    let userGetService: UserGetService;
    let userUpdateService: UserUpdateService;


    const loginDto: LoginDto = {
        email: 'asd@asd.com',
        password: 'asd'
    }


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

    const {password, ...simpleUserWithoutPassword} = simpleUser

    const response = {
        cookie: jest.fn(),
    }

    beforeEach(async () => {
        jest.resetModules()

        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
            providers: [AuthService, JwtService, AccessTokenStrategy, LocalStrategy, RefreshTokenStrategy, RolesGuard, AuthTokenService, ProfileGetService],
            controllers: [AuthController],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        authTokenService = module.get<AuthTokenService>(AuthTokenService);
        userCheckService = module.get<UserCheckService>(UserCheckService);
        userDeleteService = module.get<UserDeleteService>(UserDeleteService);
        userCreateService = module.get<UserCreateService>(UserCreateService);
        accessTokenStrategy = module.get<AccessTokenStrategy>(AccessTokenStrategy);
        refreshTokenStrategy = module.get<RefreshTokenStrategy>(RefreshTokenStrategy);
        prismaService = module.get<PrismaService>(PrismaService);
        userGetService = module.get<UserGetService>(UserGetService)
        userUpdateService = module.get<UserUpdateService>(UserUpdateService)
    });


    describe('validateUser', ()=> {
        it('should not found a user',  async () => {
            jest.spyOn(prismaService.users, 'findUnique').mockImplementationOnce(() =>null);
            const result = authService.validateUser(loginDto)
            await expect(result).rejects.toBeInstanceOf(ForbiddenException)
        });

        it('should found a user a blocked user and throw 423',  async () => {
            prismaService.users.findUnique = jest.fn().mockImplementationOnce(() => {
                return {
                    isBlocked: true
                }
            })
            const result = authService.validateUser(loginDto)
            await expect(result).rejects.toBeInstanceOf(HttpException)
        })

        it('should throw, password does not match',  async () => {
            jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => false);
            prismaService.users.findUnique = jest.fn().mockImplementationOnce(() => {
                return {
                    isBlocked: false
                }
            })
            const result = authService.validateUser(loginDto)
            await expect(result).rejects.toBeInstanceOf(ForbiddenException)
        });

        it('should return a user',  async () => {
            jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => true);
            prismaService.users.findUnique = jest.fn().mockImplementationOnce((args: Prisma.usersFindUniqueArgs) => {
                return {
                    email: args.where.email,
                    password: 'asd',
                    refreshTokens: [],
                    isBlocked: false
                }
            })
            jest.spyOn(authService as any, 'handleUserLogin').mockImplementationOnce((user: any)=> user)
            const result = await authService.validateUser(loginDto)
            expect(result).toEqual({email: loginDto.email, password: 'asd', refreshTokens: [], isBlocked: false})
        })
    })


    describe('handleUserLogin',  ()=> {
        it('should return user data without password', async ()=> {
            const user: users & {role: roles} = {
                email: simpleUser.email,
                password: simpleUser.password,
                refreshTokens: [],
                isBlocked: false,
                role: {
                    roleId: Roles.USER.roleId,
                    roleName: Roles.USER.roleName,
                    changedAt: new Date()
                },
                userId: 1,
                changedAt: new Date(),
                roleId: 1
            }
            const tokens = {
                accessToken: 'asd',
                refreshToken: 'asdasd'
            }
            const {password, refreshTokens, ...rest} = user
            jest.spyOn(authTokenService, 'getTokens').mockImplementationOnce(async ()=> tokens)
            const spyInstance = jest.spyOn(userUpdateService, 'pushNewRefreshToken')
            prismaService.users.update = jest.fn().mockImplementationOnce(()=> {})
            const result = await authService.handleUserLogin(user)
            expect(spyInstance).toBeCalledWith(tokens.refreshToken, 1)
            expect(result).toEqual({user: rest, tokens})
        })
    })

    describe('logOut', ()=> {
        const actualToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJyb2xlIjoidXNlciIsInByb2ZpbGVJZCI6MTYsImlhdCI6MTY4MjAwNjczNSwiZXhwIjoxNzEzNTY0MzM1fQ.gU7juW4SakK6uZ1eIC9DB6wT0m77muYw7yOIk0XTyaU'

        it('should throw, token does not match', async function () {
            const tokens = [
                await argon2.hash('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJyb2xlIjoidXNlciIsInByb2ZpbGVJZCI6MTYsImlhdCI6MTY4MjAwNzA4OCwiZXhwIjoxNzEzNTY0Njg4fQ.EbjOQx95Tuk97kUWgiFDQzj-zXgrPAqQCN3c-PjlMT8'),
                await argon2.hash('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJyb2xlIjoidXNlciIsInByb2ZpbGVJZCI6MTYsImlhdCI6MTY4MjAwNzc0MSwiZXhwIjoxNzEzNTY1MzQxfQ.rnqUjnkTzP4jShC9xkY7l650iLHPZ4bovfkKPNMiJhY'),
                await argon2.hash(actualToken)
            ]
            userGetService.getUserRefreshTokensById = jest.fn().mockImplementationOnce(() => {
                return {refreshTokens: tokens}
            })

            const result = authService.logOut(1, 'asdadsasd')
            await expect(result).rejects.toBeInstanceOf(NotFoundException)
        });

        it('should call deleteRefreshTokenById with the right data', async function () {
            const tokens = [
                await argon2.hash('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJyb2xlIjoidXNlciIsInByb2ZpbGVJZCI6MTYsImlhdCI6MTY4MjAwNzA4OCwiZXhwIjoxNzEzNTY0Njg4fQ.EbjOQx95Tuk97kUWgiFDQzj-zXgrPAqQCN3c-PjlMT8'),
                await argon2.hash('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2LCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJyb2xlIjoidXNlciIsInByb2ZpbGVJZCI6MTYsImlhdCI6MTY4MjAwNzc0MSwiZXhwIjoxNzEzNTY1MzQxfQ.rnqUjnkTzP4jShC9xkY7l650iLHPZ4bovfkKPNMiJhY'),
                await argon2.hash(actualToken)
            ]
            userGetService.getUserRefreshTokensById = jest.fn().mockImplementationOnce(() => {
                return {refreshTokens: tokens}
            })
            userDeleteService.deleteRefreshTokenById = jest.fn().mockImplementationOnce(()=> {})
            const spyInstance = jest.spyOn(userDeleteService, 'deleteRefreshTokenById')
            await authService.logOut(1, actualToken)
            expect(spyInstance).toBeCalledWith(1, actualToken)
        })
    })







})