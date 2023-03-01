import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class MealHistoryDeleteService {
    constructor(private prismaService:PrismaService) {
    }

    deleteMealHistoryById(mealHistoryId: number) {
        return this.prismaService.mealHistory.delete({
            where: {mealHistoryId}
        })
    }
}
