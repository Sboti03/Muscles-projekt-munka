import {Body, ConflictException, Controller, Post, UseGuards} from '@nestjs/common';
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
import {ConnectionCheckService} from "../../../connection/services/connection-check/connection-check.service";

@UseGuards(AccessTokenGuard)
@Controller('connection-request')
export class ConnectionRequestCreateController {

    constructor(private getService: ConnectionRequestGetService,
                private checkService: ConnectionRequestCheckService,
                private createService:ConnectionRequestCreateService,
                private connectionCheckService:ConnectionCheckService) {
    }

    @UseGuards(ProfileGuard)
    @Post('/create')
    async createConnectionRequest(@Body() idParam: IdParam,
                                  @GetCurrentUserId() requesterId: number,
                                  @GetCurrentUser('role') requesterRole: RoleEnum) {
        const {userId, coachId} = this.getService.getUserAndCoachId(idParam.id, requesterId, requesterRole)

        const isConnectionExist = await this.connectionCheckService.checkExistingConnection(userId, coachId)
        if (isConnectionExist) {
            throw new ConflictException('Existing connection')
        }
        const isConnectionRequestExist = await this.checkService.checkExistingConnectionRequest(userId, coachId)
        if (isConnectionRequestExist) {
            throw new ConflictException('Existing connection request')
        }
        const createInput = this.getService.getConnectionRequestCreateInput(userId, requesterId, coachId)
        return this.createService.createConnectionRequest(createInput);
    }
}
