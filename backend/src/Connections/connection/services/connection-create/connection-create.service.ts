import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";
import {
    ConnectionRequestGetService
} from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import {
    ConnectionRequestDeleteService
} from "../../../connection-request/services/connection-request-delete/connection-request-delete.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class ConnectionCreateService {
    constructor(private prismaService:PrismaService,
                private connectionRequestGetService:ConnectionRequestGetService,
                private connectionRequestDeleteService:ConnectionRequestDeleteService) {

    }

    async createConnection(connectionRequestId: number) {
        const {userId, coachId, accessAll} = await this.connectionRequestGetService.getConnectionRequestById(connectionRequestId)
        await this.connectionRequestDeleteService.deleteConnection(userId, coachId)
        if (accessAll) {
            await this.prismaService.connectionRequest.deleteMany({
                where: {
                    userId,
                    accessAll: true
                }
            })
        }

        return  this.prismaService.connections.create({
            data: this.createConnectionInput(userId, coachId, accessAll)
        })
    }

    createConnectionInput(userId: number, coachId: number, accessAll: boolean): Prisma.connectionsCreateInput {
        return {
            coach: {connect: {userId: coachId}},
            user: {connect: {userId}},
            accessAll: accessAll
        }
    }
}
