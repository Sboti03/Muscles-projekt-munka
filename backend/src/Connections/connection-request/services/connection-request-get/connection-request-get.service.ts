import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
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
        const coachId = isRequesterUser ?  id : requesterId
        return {userId, coachId}
    }


    getConnectionRequestCreateInput(userId: number, requesterId: number, coachId: number, accessAll: boolean | undefined): Prisma.connectionRequestCreateInput {
        return {
            coach: {connect: {userId: coachId}},
            user: {connect: {userId}},
            accessAll: accessAll,
            requestBy: requesterId,
        }
    }

    getConnectionRequestById(connectionRequestId: number) {
        return this.prismaService.connectionRequest.findUniqueOrThrow({
            where: {
                connectionRequestId: connectionRequestId
            }
        })
    }
}
