import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class ConnectionRequestGetService {
    constructor(private prismaService:PrismaService) {
    }

    getAllByUserId(userId: number) {
        return this.prismaService.connectionRequest.findMany({
            where: {
                OR: [
                    {userId},
                    {coachId: userId}
                ]
            },
        })
    }

    getConnectionRequestIdByIds(userId: number, coachId: number) {
        return this.prismaService.connectionRequest.findFirstOrThrow({
            where: {
                userId,
                coachId
            }
        })
    }

}
