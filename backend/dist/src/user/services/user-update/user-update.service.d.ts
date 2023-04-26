import { PrismaService } from '../../../Common/utils/prirsma.service';
import { UserCheckService } from '../user-check/user-check.service';
import { UserGetService } from '../user-get/user-get.service';
export declare class UserUpdateService {
    private userGetService;
    private prismaService;
    private checkUserService;
    constructor(userGetService: UserGetService, prismaService: PrismaService, checkUserService: UserCheckService);
    updatePassword(oldPassword: string, newPassword: string, userId: number): Promise<import(".prisma/client").users>;
    pushNewRefreshToken(refreshToken: string, userId: number): Promise<import(".prisma/client").users>;
    updateEmail(email: string, userId: number): Promise<import(".prisma/client").users>;
}
