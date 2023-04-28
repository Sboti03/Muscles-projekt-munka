import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class AdminDeleteService {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteUserByUserId(userId: number): import(".prisma/client").Prisma.Prisma__usersClient<import(".prisma/client").users, never>;
}
