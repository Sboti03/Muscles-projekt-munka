import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class WeightHistoryGetService {
    constructor(private prismaService:PrismaService) {
    }

    async getWeightFromDate(date: Date, profileId: number): Promise<{weight: number, day: {date: Date}}> {
        const request = this.prismaService.weightHistory.findFirstOrThrow({
            where: {
                day: {
                    profileId: profileId,
                    date: {
                        lte: date
                    }
                },
            },
            orderBy: {
                day: {
                    date: 'desc'
                }
            },
            select: {
                weight: true,
                day: {
                    select: {
                        date: true,
                    }
                }
            }
        })
        try {
            return await request
        } catch (e) {
            return {weight: undefined, day: {date: undefined}}
        }
    }
}
