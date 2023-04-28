import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class DayHistoryCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createDayHistory(profileId: number, date: Date): import(".prisma/client").Prisma.Prisma__dayHistoryClient<{
        dayId: number;
    }, never>;
}
