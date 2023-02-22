import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class WeightHistoryCreateService {
    constructor(private prismaService: PrismaService) {
    }
    
    createWeightHistory(weight: number, dayId: number) {
        this.prismaService.weightHistory.create({
            data: {
                weight: weight,
                dayId: dayId,
            },
        });
    }

}
