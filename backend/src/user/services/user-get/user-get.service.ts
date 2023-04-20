import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../../Common/utils/prirsma.service';
import {Roles} from '../../../Common/Role/utils/roles';
import {CreateUserDto} from '../../dto/createUser.dto';
import {Prisma} from '@prisma/client';
import {encryptData} from '../../../Common/utils/bcrypt';

@Injectable()
export class UserGetService {
    constructor(private prismaService: PrismaService) {
    }

    getUserByEmail(email: string) {
        return this.prismaService.users.findUnique({
            where: {
                email,
            },
            include: {
                role: true
            },
        });
    }

    getUserRefreshTokensById(userId: number) {
        return this.prismaService.users.findUnique({
            where: {
                userId
            },
            select: {
                refreshTokens: true
            }
        })
    }

    getUserById(userId: number) {
        return this.prismaService.users.findUnique({
            where: {
                userId,
            },
            include: {
                role: true,
                profileData: {
                    select: {
                        profileId: true
                    }
                }
            },
        });
    }

    getRoleId(isCoach: boolean): number {
        return isCoach ? Roles.COACH.roleId : Roles.USER.roleId;
    }

    getUsersCreateInput(user: CreateUserDto): Prisma.usersCreateInput {
        const roleId = this.getRoleId(user.isCoach);
        return {
            email: user.email,
            password: encryptData(user.password),
            role: {
                connect: {
                    roleId,
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
        };
    }



    getTokensByUserId(userId: number) {
        return this.prismaService.users.findUnique({
            select: {
                refreshTokens: true
            },
            where: {
                userId,
            },
        });
    }

    getAllUser() {
        return this.prismaService.users.findMany({
            include: {role: true}
        })
    }
}
