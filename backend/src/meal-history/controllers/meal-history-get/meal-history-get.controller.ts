import { Controller, Get, Logger, Query, UseGuards } from "@nestjs/common";
import { PrismaService } from "../../../Common/utils/prirsma.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import {
    GetAndCheckProfileId,
    GetCurrentUser,
    GetCurrentUserId,
    GetCurrentUserProfileId
} from "../../../auth/decorators/decorators";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { MealHistoryGetService } from "../../services/meal-history-get/meal-history-get.service";
import { AccessTokenGuard } from "../../../auth/guards/access-token.guard";
import { UserDayHistoryQuery } from "../../../Connections/connection/data/UserDayHistoryQuery";
import DayHistoryBetweenQuery from "../../dto/DayHistoryBetween.query";

@UseGuards(AccessTokenGuard)
@Controller("meal-history")
export class MealHistoryGetController {

    constructor(private prismaService: PrismaService,
                private dayHistoryGetService: DayHistoryGetService,
                private dayHistoryCheckService: DayHistoryCheckService,
                private mealHistoryGetService: MealHistoryGetService) {
    }

    @Get("/")
    async getMealHistory(@Query() historyGetDto: MealHistoryGetDto,
                         @GetAndCheckProfileId() currentProfileId,
                         @GetCurrentUserId() currentUserId: number) {
        return this.mealHistoryGetService.getMealHistory(historyGetDto, currentProfileId, currentUserId);
    }

    @Get("data/")
    async getMealHistoryData(@Query() dayHistoryQuery: UserDayHistoryQuery,
                             @GetAndCheckProfileId() currentProfileId,
                             @GetCurrentUserId() currentUserId: number) {
        return this.mealHistoryGetService.getMealHistoryData(currentUserId, dayHistoryQuery.date, dayHistoryQuery.userId, currentProfileId);
    }

    @Get('data/between')
    async getMealHistoryBetween(@Query() dayHistoryBetweenQuery: DayHistoryBetweenQuery,
                               @GetCurrentUserProfileId() currentProfileId: number,
                               @GetCurrentUserId() currentUserId: number) {
        const {to, from, userId} = dayHistoryBetweenQuery
        Logger.log(`/meal-history/data/between (GET) from: ${from.toISOString()} to: ${to.toISOString()} requesterId: ${currentUserId} ${userId ? 'requested: ' + userId : ''}`)
        return  this.mealHistoryGetService.getMealHistoryBetween(currentUserId, currentProfileId, from, to, userId);
    }


}
