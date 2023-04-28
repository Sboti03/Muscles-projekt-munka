import { PrismaService } from "../../../../Common/utils/prirsma.service";
import { ConnectionRequestGetService } from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import { ConnectionRequestDeleteService } from "../../../connection-request/services/connection-request-delete/connection-request-delete.service";
import { Prisma } from "@prisma/client";
export declare class ConnectionCreateService {
    private prismaService;
    private connectionRequestGetService;
    private connectionRequestDeleteService;
    constructor(prismaService: PrismaService, connectionRequestGetService: ConnectionRequestGetService, connectionRequestDeleteService: ConnectionRequestDeleteService);
    createConnection(connectionRequestId: number): Promise<import(".prisma/client").connections>;
    createConnectionInput(userId: number, coachId: number): Prisma.connectionsCreateInput;
}
