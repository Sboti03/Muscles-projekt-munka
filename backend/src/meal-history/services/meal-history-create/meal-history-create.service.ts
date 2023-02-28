import {Injectable} from '@nestjs/common';
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class MealHistoryCreateService {
    constructor(private prismaService: PrismaService) {
    }

    createMealHistory(mealHistoryCreateInput: Prisma.mealHistoryCreateInput) {
        return this.prismaService.mealHistory.create({
            data: mealHistoryCreateInput,
            select: {
                mealId: true
            }
        })
    }
}
