import { PrismaService } from "../../../../Common/utils/prirsma.service";
export declare class ConnectionRequestDeleteService {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteConnection(userId: number, coachId: number): import(".prisma/client").Prisma.Prisma__connectionRequestClient<import(".prisma/client").connectionRequest, never>;
}
