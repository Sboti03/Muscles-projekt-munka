import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class AdminBlockService {
    private prismaService;
    constructor(prismaService: PrismaService);
    blockUserByUserId(userId: number): Promise<import(".prisma/client").users>;
    unblockUserById(userId: number): import(".prisma/client").Prisma.Prisma__usersClient<import(".prisma/client").users, never>;
    deleteAllUserData(email: string): import(".prisma/client").Prisma.Prisma__usersClient<import(".prisma/client").users, never>;
}
