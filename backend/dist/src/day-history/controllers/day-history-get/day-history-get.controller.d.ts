import { DayHistoryGetService } from "../../services/day-history-get/day-history-get.service";
import { CommentGetDto } from "../../dto/comment.get.dto";
export declare class DayHistoryGetController {
    private dayHistoryGetService;
    constructor(dayHistoryGetService: DayHistoryGetService);
    findComment(commentGetDto: CommentGetDto, requesterUserId: number): Promise<{
        comment: string;
        changedAt: Date;
    } | {
        comment: string;
    }>;
}
