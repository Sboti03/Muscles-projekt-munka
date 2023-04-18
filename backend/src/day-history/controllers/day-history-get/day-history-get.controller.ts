import {Body, ConflictException, Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {DayHistoryGetService} from "../../services/day-history-get/day-history-get.service";
import {DateParam} from "../../../Common/params/date.param";
import {GetAndCheckProfileId, GetCurrentUserId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {DayHistoryCheckService} from "../../services/day-history-check/day-history-check.service";
import {MealHistoryGetService} from "../../../meal-history/services/meal-history-get/meal-history-get.service";
import DeleteMealHistoryDto from "../../../meal-history/dto/deleteMealHistory.dto";
import MealHistoryGetDto from "../../dto/meal-history-get.dto";
import {GoalsGetService} from "../../../goals/services/goals-get/goals-get.service";
import {WeightHistoryGetService} from "../../../weight-history/services/weight-history-get/weight-history-get.service";
import {CommentGetDto} from "../../dto/comment.get.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('day-history')
@UseGuards(AccessTokenGuard)
@Controller('day-history')
export class DayHistoryGetController {

    constructor(private dayHistoryGetService:DayHistoryGetService) {
    }


    @Get('comment')
    async findComment(@Query() commentGetDto:CommentGetDto, @GetCurrentUserProfileId() requesterUserId: number) {
        const result = await this.dayHistoryGetService.getComment(commentGetDto.date, requesterUserId, commentGetDto.profileId)
        if (result) {
            return result
        }
        return {comment: ''}
    }







}
