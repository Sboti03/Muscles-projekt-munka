import {Controller, Get, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {GetAndCheckProfileId} from "../../../auth/decorators/decorators";
import {GoalsGetService} from "../../services/goals-get/goals-get.service";
import {ApiTags} from "@nestjs/swagger";
@ApiTags('goals')
@UseGuards(AccessTokenGuard)
@Controller('goals')
export class GoalsGetController {
    constructor(private goalsGetService:GoalsGetService) {}

    @Get()
    async getGoalsById(@GetAndCheckProfileId() profileId: number) {
        return this.goalsGetService.getGoalsByProfileId(profileId)
    }

}
