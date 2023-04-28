import { UserCheckService } from '../user-check/user-check.service';
import { PrismaService } from '../../../Common/utils/prirsma.service';
import { UserGetService } from '../user-get/user-get.service';
export declare class UserDeleteService {
    private checkUserService;
    private prismaService;
    private userGetService;
    constructor(checkUserService: UserCheckService, prismaService: PrismaService, userGetService: UserGetService);
    deleteRefreshTokenById(userId: number, refreshToken: string): Promise<import(".prisma/client").users>;
}
