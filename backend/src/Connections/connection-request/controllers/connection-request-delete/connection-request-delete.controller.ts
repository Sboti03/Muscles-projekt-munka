import {Body, ConflictException, Controller, Delete, Post, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
import {IdParam} from "../../../../Common/params/id.param";
import {GetCurrentUser, GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {ProfileGuard} from "../../../../auth/guards/profile.guard";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
import {UserGetService} from "../../../../user/services/user-get/user-get.service";
import {ConnectionRequestGetService} from "../../services/connection-request-get/connection-request-get.service";
import {ConnectionRequestCheckService} from "../../services/connection-request-check/connection-request-check.service";
import {
    ConnectionRequestCreateService
} from "../../services/connection-request-create/connection-request-create.service";
import {
    ConnectionRequestDeleteService
} from "../../services/connection-request-delete/connection-request-delete.service";

@UseGuards(AccessTokenGuard)
@Controller('connection-request')
export class ConnectionRequestDeleteController {

    constructor(private userGetService: UserGetService,
                private getService: ConnectionRequestGetService,
                private checkService: ConnectionRequestCheckService,
                private deleteService:ConnectionRequestDeleteService) {
    }

    @UseGuards(ProfileGuard)
    @Delete('/')
    async createConnectionRequest(@Body() idParam: IdParam,
                                  @GetCurrentUserId() requesterId: number,
                                  @GetCurrentUser('role') requesterRole: RoleEnum) {
        const {userId, coachId} = this.getService.getUserAndCoachId(idParam.id, requesterId, requesterRole)
        const isConnectionRequestExist = await this.checkService.checkExistingConnectionRequest(userId, coachId)
        if (!isConnectionRequestExist) {
            throw new ConflictException('No connection request found')
        }
        return this.deleteService.deleteConnection(userId, coachId)
    }
}
