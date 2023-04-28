import { PrismaService } from "../utils/prirsma.service";
export declare class InitService {
    private prismaService;
    constructor(prismaService: PrismaService);
    init(): Promise<any>;
    initPeriods(): Promise<void>;
    createAdmin(userId: number): Promise<import(".prisma/client").users>;
}
