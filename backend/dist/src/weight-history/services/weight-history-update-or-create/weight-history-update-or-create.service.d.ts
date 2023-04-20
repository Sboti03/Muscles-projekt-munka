import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class WeightHistoryUpdateOrCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    updateOrCreateWeightHistory(weight: number, dayId: number): import(".prisma/client").Prisma.Prisma__weightHistoryClient<import(".prisma/client").weightHistory, never>;
}
