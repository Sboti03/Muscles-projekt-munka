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
            }
        })
    }
}
