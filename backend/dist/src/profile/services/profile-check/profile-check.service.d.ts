import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class ProfileCheckService {
    private prismaService;
    constructor(prismaService: PrismaService);
    checkExistingProfileByUserId(userId: number): Promise<boolean>;
}
