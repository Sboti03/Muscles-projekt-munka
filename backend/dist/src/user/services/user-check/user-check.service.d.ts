import { PrismaService } from '../../../Common/utils/prirsma.service';
import { UserGetService } from '../user-get/user-get.service';
export declare class UserCheckService {
    private prismaService;
    private getUserService;
    constructor(prismaService: PrismaService, getUserService: UserGetService);
    checkEmail(email: string, userId: number): Promise<boolean>;
    checkPassword(password: string, userId: number): Promise<boolean>;
    checkRefreshToken(refreshToken: string, userId: number): Promise<boolean>;
    checkExistingUserByEmail(email: string): Promise<boolean>;
}
