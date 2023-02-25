import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {RoleEnum} from "../../../Role/utils/roles";
import {Prisma} from "@prisma/client";

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

    getUserAndCoachId(id: number, requesterId: number, requesterRole: RoleEnum): {userId: number, coachId: number} {
        const isRequesterUser = requesterRole === RoleEnum.USER
        const userId = isRequesterUser ? requesterId : id
        const coachId = isRequesterUser ? requesterId : id
        return {userId, coachId}
    }


    getConnectionRequestCreateInput(userId: number, requesterId: number, coachId: number): Prisma.connectionRequestCreateInput {
        return {
            coach: {connect: {userId: coachId}},
            requestBy: requesterId,
            user: {connect: {userId}}
        }
    }
}
