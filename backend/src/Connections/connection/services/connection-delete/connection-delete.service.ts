import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";

@Injectable()
export class ConnectionDeleteService {

    constructor(private prismaService:PrismaService) {
    }

    deleteConnection(userId: number, coachId: number) {
        return this.prismaService.connections.delete({
            where: {
                userId_coachId: {userId, coachId}
            }
        })
    }
}
