import { PrismaService } from "../../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class ConnectionRequestCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createConnectionRequest(connectionRequestCreateInput: Prisma.connectionRequestCreateInput): Prisma.Prisma__connectionRequestClient<import(".prisma/client").connectionRequest, never>;
}
