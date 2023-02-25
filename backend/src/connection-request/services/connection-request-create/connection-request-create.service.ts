import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class ConnectionRequestCreateService {
    constructor(private prismaService:PrismaService) {
    }

    createConnectionRequest(connectionRequestCreateInput: Prisma.connectionRequestCreateInput) {
        return this.prismaService.connectionRequest.create({
            data: connectionRequestCreateInput
        })
    }
}
