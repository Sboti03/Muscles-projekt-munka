import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class GoalsGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getGoalsByProfileId(profileId: number): import(".prisma/client").Prisma.Prisma__goalsClient<import(".prisma/client").goals, never>;
    getGoalByProfileIdAndDate(profileId: number, date: Date): Promise<import(".prisma/client").goals>;
}
