import { PrismaService } from "../../../../Common/utils/prirsma.service";
export declare class ConnectionDeleteService {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteConnection(userId: number, coachId: number): import(".prisma/client").Prisma.Prisma__connectionsClient<import(".prisma/client").connections, never>;
}
