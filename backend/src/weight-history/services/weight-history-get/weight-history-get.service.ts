import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class WeightHistoryGetService {
    constructor(private prismaService:PrismaService) {
    }

    getWeightFromDate(date: Date, profileId: number) {
        return this.prismaService.weightHistory.findFirst({
            where: {
                day: {
                    profileId: profileId,
                    date: {
                        lte: date
                    }
                },
            },
            select: {
                weight: true,
                day: {
                    select: {
                        date: true
                    }
                }
            }
        })
    }
}
