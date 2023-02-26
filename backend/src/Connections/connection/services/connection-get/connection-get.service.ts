import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";

@Injectable()
export class ConnectionGetService {

    constructor(private prismaService:PrismaService) {
    }

    getConnectionByIds(userId: number, coachId: number) {
        this.prismaService.connections.findFirstOrThrow({
            where: {
                userId,
                coachId
            }
        })
    }
}
