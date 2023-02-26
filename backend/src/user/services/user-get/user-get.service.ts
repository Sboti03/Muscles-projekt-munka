import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../../Common/utils/prirsma.service';
import {Roles} from '../../../Common/Role/utils/roles';
import {CreateUserDTO} from '../../dto/createUserDTO';
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
                roles: true,
            },
        });
    }

    getUserById(userId: number) {
        return this.prismaService.users.findUnique({
            where: {
                userId,
            },
            include: {
                roles: true
            },
        });
    }

    getRoleId(isCoach: boolean): number {
        return isCoach ? Roles.COACH.roleId : Roles.USER.roleId;
    }

    getUsersCreateInput(user: CreateUserDTO): Prisma.usersCreateInput {
        const roleId = this.getRoleId(user.isCoach);
        return {
            email: user.email,
            password: encryptData(user.password),
            roles: {
                connect: {
                    roleId,
                },
            },
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
}
