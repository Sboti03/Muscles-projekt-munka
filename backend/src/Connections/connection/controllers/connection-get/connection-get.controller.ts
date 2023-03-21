import {Controller, Get, NotFoundException, Param, Query, UseGuards} from '@nestjs/common';
import {ConnectionGetService} from "../../services/connection-get/connection-get.service";
import {GetCurrentUser, GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
import {IdParam} from "../../../../Common/params/id.param";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
import {DayHistoryGetService} from "../../../../day-history/services/day-history-get/day-history-get.service";
import {UserDayHistoryQuery} from "../../data/UserDayHistoryQuery";
import {ConnectionCheckService} from "../../services/connection-check/connection-check.service";
import {UserGetService} from "../../../../user/services/user-get/user-get.service";
import {ProfileGetService} from "../../../../profile/services/profile-get/profile-get.service";
import {MealHistoryGetService} from "../../../../meal-history/services/meal-history-get/meal-history-get.service";

@UseGuards(AccessTokenGuard)
@Controller('connection')
export class ConnectionGetController {
    constructor(private conGetService: ConnectionGetService,
                private mealHistoryGetService: MealHistoryGetService,
                private connectionCheckService: ConnectionCheckService,
                private profileGetService: ProfileGetService) {
    }

    @Get('all')
    async getAllConnection(@GetCurrentUserId() userId: number) {
        return this.conGetService.getAllConnection(userId)
    }

    @Get('id/:id')
    async getConnectionById(@Param() idParam: IdParam, @GetCurrentUserId() currentUserId: number, @GetCurrentUser('role') role: RoleEnum) {
        const userId = role === RoleEnum.USER ? currentUserId : idParam.id
        const coachId = role === RoleEnum.COACH ? currentUserId : idParam.id
        if (await this.connectionCheckService.checkExistingConnection(userId, coachId)) {
            throw new NotFoundException('No connection found')
        }
        return this.conGetService.getUser(idParam.id)
    }

    // @Get('user-day-history/')
    // async getUserDayHistory(@Query() userDayHistoryQuery: UserDayHistoryQuery,
    //                         @GetCurrentUser('role') role: RoleEnum,
    //                         @GetCurrentUserId() currentUserId: number) {
    //     const {id, date} = userDayHistoryQuery
    //     const userId = role === RoleEnum.USER ? currentUserId : id
    //     const coachId = role === RoleEnum.COACH ? currentUserId : id
    //     if (await this.connectionCheckService.checkExistingConnection(userId, coachId)) {
    //         throw new NotFoundException('No connection found')
    //     }
    //     const {profileId} = await this.profileGetService.getProfileIdByUserId(userId)
    //     try {
    //         return this.dayHistoryGetService.get(date, profileId)
    //     } catch (e ) {
    //         return []
    //     }
    // }
}
