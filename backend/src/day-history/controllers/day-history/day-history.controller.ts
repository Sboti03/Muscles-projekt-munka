import {Body, Controller, NotFoundException, Post, UseGuards} from '@nestjs/common';
import {DayHistoryCreateService} from "../../services/day-history-create/day-history-create.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import DayHistoryCommentDto from "../../dto/day-history-comment.dto";
import {
    ConnectionCheckService
} from "../../../Connections/connection/services/connection-check/connection-check.service";
import {GetCurrentUserId} from "../../../auth/decorators/decorators";
import {DayHistoryGetService} from "../../services/day-history-get/day-history-get.service";

@Controller('day-history')
@UseGuards(AccessTokenGuard)
export class DayHistoryController {
    constructor(private historyCreateService:DayHistoryCreateService,
                private connectionCheckService:ConnectionCheckService,
                private dayHistoryGetService: DayHistoryGetService) {
    }


    @Post('/comment')
    async comment(@Body() dayHistoryCommentDto: DayHistoryCommentDto, @GetCurrentUserId() coachId: number) {
        const isConnectionExist = await this.connectionCheckService.checkAccessCoachToUser(dayHistoryCommentDto.userId, coachId)
        if (!isConnectionExist) {
            throw new NotFoundException('No connection found')
        }
        return this.historyCreateService.commentDayHistory(dayHistoryCommentDto.userId, dayHistoryCommentDto.date, dayHistoryCommentDto.comment)
    }
}
