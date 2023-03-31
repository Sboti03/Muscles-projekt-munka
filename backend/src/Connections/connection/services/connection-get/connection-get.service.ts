import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";

@Injectable()
export class ConnectionGetService {

    constructor(private prismaService:PrismaService) {
    }

    getConnectionByIds(userId: number, coachId: number) {
        return this.prismaService.connections.findUniqueOrThrow({
            where: {
                userId_coachId: {userId, coachId}
            },
        })
    }

    getAccessAllConnection(userId: number) {
        return this.prismaService.connections.findFirstOrThrow({
            where: {
                userId,
                accessAll: true
            }
        })
    }

    getAllConnection(id: number) {
        return this.prismaService.connections.findMany({
            where: {
                OR: [
                    {userId: id},
                    {coachId: id}
                ]
            },
            select: {
                user: {
                    select: {
                        profileData: {
                            select: {
                                firstName: true,
                                lastName: true,
                                birthDay: true,
                                height: true,
                                registrationDate: true,
                            }
                        },
                        userId: true,
                        email: true
                    }
                }
            }
        })
    }

    getUser(id: number) {
        return this.prismaService.users.findFirstOrThrow({
            where: {
                userId: id
            },
            select: {
                userId: true,
                email: true,
                profileData: {
                    select: {
                        firstName: true,
                        lastName: true,
                        height: true,
                        birthDay: true,
                        registrationDate: true,
                    }
                }
            }
        })
    }
}
