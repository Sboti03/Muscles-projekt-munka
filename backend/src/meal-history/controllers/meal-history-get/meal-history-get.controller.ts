import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import {GetAndCheckProfileId, GetCurrentUser, GetCurrentUserId} from "../../../auth/decorators/decorators";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {UserDayHistoryQuery} from "../../../Connections/connection/data/UserDayHistoryQuery";
import {RoleEnum} from "../../../Common/Role/utils/roles";

@UseGuards(AccessTokenGuard)
@Controller('meal-history')
export class MealHistoryGetController {

    constructor(private prismaService:PrismaService,
                private dayHistoryGetService:DayHistoryGetService,
                private dayHistoryCheckService:DayHistoryCheckService,
                private mealHistoryGetService:MealHistoryGetService) {
    }

    @Get('/')
    async getMealHistory(@Query() historyGetDto:MealHistoryGetDto, @GetAndCheckProfileId() currentProfileId) {
        return this.mealHistoryGetService.getMealHistory(historyGetDto, currentProfileId)
    }

    @Get('data/')
    async getDayHistoryData(@Query() dayHistoryQuery: UserDayHistoryQuery,
                            @GetAndCheckProfileId() currentProfileId,
                            @GetCurrentUser('role') role: RoleEnum,
                            @GetCurrentUserId() currentUserId: number) {
       return this.mealHistoryGetService.getDayHistoryData(currentUserId, dayHistoryQuery.date, dayHistoryQuery.id, currentProfileId, role)
    }





}
