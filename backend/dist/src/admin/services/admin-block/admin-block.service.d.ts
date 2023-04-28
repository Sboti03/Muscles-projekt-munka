import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class AdminBlockService {
    private prismaService;
    constructor(prismaService: PrismaService);
    blockUserByUserId(userId: number): import(".prisma/client").Prisma.Prisma__usersClient<import(".prisma/client").users, never>;
}
