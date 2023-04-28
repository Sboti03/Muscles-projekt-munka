import { PrismaService } from '../../../Common/utils/prirsma.service';
import { CreateUserDto } from '../../dto/createUser.dto';
import { Prisma } from '@prisma/client';
export declare class UserGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getUserByEmail(email: string): Prisma.Prisma__usersClient<import(".prisma/client").users & {
        role: import(".prisma/client").roles;
    }, never>;
    getUserById(userId: number): Prisma.Prisma__usersClient<import(".prisma/client").users & {
        role: import(".prisma/client").roles;
    }, never>;
    getRoleId(isCoach: boolean): number;
    getUsersCreateInput(user: CreateUserDto): Prisma.usersCreateInput;
    getTokensByUserId(userId: number): Prisma.Prisma__usersClient<{
        refreshTokens: string[];
    }, never>;
    getAllUser(): Prisma.PrismaPromise<(import(".prisma/client").users & {
        role: import(".prisma/client").roles;
    })[]>;
}
