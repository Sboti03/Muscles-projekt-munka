import {BadRequestException, Body, Controller, Patch, UseGuards} from '@nestjs/common';
import {GoalsUpdateService} from "../../services/goals-update/goals-update.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {GetAndCheckProfileId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {GoalsUpdateDto} from "../../goals-update.dto";
import {GoalsConvertService} from "../../services/goals-convert/goals-convert.service";
import {GoalsCheckService} from "../../services/goals-check/goals-check.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('goals')
@UseGuards(AccessTokenGuard)
@Controller('goals')
export class GoalsUpdateController {
    constructor(private updateService:GoalsUpdateService,
                private convertService: GoalsConvertService,
                private checkService:GoalsCheckService) {}

    @Patch()
    async updateProfile(@GetAndCheckProfileId() profileId: number, @Body() goalsUpdateDto: GoalsUpdateDto) {
        const isDataValid = await this.checkService.checkGoalsUpdateDto(goalsUpdateDto, profileId);
        if (!isDataValid) {
            throw new BadRequestException('Bad args')
        }
        const goalUpdateInput = this.convertService.convertGoalsUpdateDtoToInput(goalsUpdateDto)
        return this.updateService.updateGoalsByProfileId(profileId, goalUpdateInput)
    }
}
