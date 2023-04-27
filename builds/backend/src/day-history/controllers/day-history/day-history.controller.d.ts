import { DayHistoryCreateService } from "../../services/day-history-create/day-history-create.service";
import DayHistoryCommentDto from "../../dto/day-history-comment.dto";
import { ConnectionCheckService } from "../../../Connections/connection/services/connection-check/connection-check.service";
import { DayHistoryGetService } from "../../services/day-history-get/day-history-get.service";
export declare class DayHistoryController {
    private historyCreateService;
    private connectionCheckService;
    private dayHistoryGetService;
    constructor(historyCreateService: DayHistoryCreateService, connectionCheckService: ConnectionCheckService, dayHistoryGetService: DayHistoryGetService);
    comment(dayHistoryCommentDto: DayHistoryCommentDto, coachId: number): Promise<import(".prisma/client").dayHistory>;
}
