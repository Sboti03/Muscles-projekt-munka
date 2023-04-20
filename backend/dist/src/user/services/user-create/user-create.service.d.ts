import { PrismaService } from '../../../Common/utils/prirsma.service';
import { Prisma } from '@prisma/client';
export declare class UserCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createUser(user: Prisma.usersCreateInput): Prisma.Prisma__usersClient<import(".prisma/client").users & {
        role: import(".prisma/client").roles;
    }, never>;
}
