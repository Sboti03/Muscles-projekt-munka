import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class WeightHistoryUpdateOrCreateService {
    constructor(private prismaService: PrismaService) {
    }

    updateOrCreateWeightHistory(weight: number, dayId: number) {
        return this.prismaService.weightHistory.upsert({
            where: {
                dayId: dayId,
            },
            update: {
                weight: weight,
            },
            create: {
                weight: weight,
                dayId: dayId,
            },
        });
    }
}
