import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class WeightHistoryGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getWeightFromDate(date: Date, profileId: number): Promise<{
        weight: number;
        day: {
            date: Date;
        };
    }>;
}
