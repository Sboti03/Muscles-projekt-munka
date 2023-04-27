import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import * as crypto from "crypto";

@Injectable()
export class AdminBlockService {
    constructor(private prismaService: PrismaService) {
    }

    async blockUserByUserId(userId: number) {
        const user = await this.prismaService.users.findUnique({where: {userId}, include: {role: true}})
        if (!user || user.role.roleName === RoleEnum.ADMIN) {
            throw new NotFoundException("No user or coach found")
        }
        return this.prismaService.users.update({
            where: {
                userId,
            },
            data: {
                isBlocked: true,
            },
        });
    }

    unblockUserById(userId: number) {
        return this.prismaService.users.update({
            where: {userId},
            data: {isBlocked: false}
        });
    }

   async deleteAllUserData(email: string) {
        const res = await this.prismaService.users.findFirst({
            where: {
                email,
                role: {
                    OR: [
                        {roleName: RoleEnum.USER},
                        {roleName: RoleEnum.COACH}
                    ]
                },
                isDeleted: false
            },
        })
       Logger.log(`${res.roleId}`)
       if (!res) {
           throw new NotFoundException("No user found")
       }
       return this.prismaService.users.update({
            where: {email},
            data: {
                email: crypto.randomUUID(),
                password: '',
                isDeleted: true,
                isBlocked: true,
                profileData: {
                    update: {
                        birthDay: null,
                        firstName: '',
                        lastName: '',
                        height: 0,
                        profilePicPath: ''
                    }
                }
            }
        })
    }
}
