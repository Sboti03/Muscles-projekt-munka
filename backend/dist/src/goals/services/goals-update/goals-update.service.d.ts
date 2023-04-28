import { PrismaService } from "../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class GoalsUpdateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    updateGoalsByProfileId(profileId: number, goalsUpdateInput: Prisma.goalsUpdateInput): Prisma.Prisma__goalsClient<import(".prisma/client").goals, never>;
}
