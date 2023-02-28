import {Controller, Get} from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Controller('meal-history-get')
export class MealHistoryGetController {

    constructor(private prismaService:PrismaService) {
    }

}
