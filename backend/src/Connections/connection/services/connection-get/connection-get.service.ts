import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";
import runAllTicks = jest.runAllTicks;

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
                userId: true,
                accessAll: true,
                coachId: true,
                connectionId: true,
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
