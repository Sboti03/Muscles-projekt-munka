import {Controller, Get} from '@nestjs/common';
import {DayHistoryService} from "../../services/day-history.service";

@Controller('day-history-create')
export class DayHistoryCreateController {
    constructor(private dayHistoryService: DayHistoryService) {
    }

    @Get()
    async createDayHistory() {

    }
}
