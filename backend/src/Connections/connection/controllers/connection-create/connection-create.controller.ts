import {Body, ConflictException, Controller, NotFoundException, Post, UseGuards} from '@nestjs/common';
import {IdParam} from "../../../../Common/params/id.param";
import {GetCurrentUser, GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {
    ConnectionRequestGetService
} from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import {ConnectionGetService} from "../../services/connection-get/connection-get.service";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
import {ConnectionCreateService} from "../../services/connection-create/connection-create.service";
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
import {ProfileGuard} from "../../../../auth/guards/profile.guard";
import {ProfileCheckService} from "../../../../profile/services/profile-check/profile-check.service";
import {ConnectionCheckService} from "../../services/connection-check/connection-check.service";
import {
    ConnectionRequestCheckService
} from "../../../connection-request/services/connection-request-check/connection-request-check.service";


@UseGuards(AccessTokenGuard)
@Controller('connection')
export class ConnectionCreateController {

    constructor(private connReqGetService: ConnectionRequestGetService,
                private connGetService: ConnectionGetService,
                private connCreateService: ConnectionCreateService,
                private profileCheckService: ProfileCheckService,
                private connCheckService:ConnectionCheckService,
                private connReqCheckService:ConnectionRequestCheckService) {
    }


    @UseGuards(ProfileGuard)
    @Post('/accept')
    async acceptConnection(@Body() idParam: IdParam,
                           @GetCurrentUserId() requesterId: number,
                           @GetCurrentUser('role') requesterRole: RoleEnum) {
        if (idParam.id === requesterId) {
            throw new ConflictException('Own id')
        }
        const {userId, coachId} = this.connReqGetService.getUserAndCoachId(idParam.id, requesterId, requesterRole)
        const otherId = requesterId === userId ? coachId : userId
        const otherProfileExist = await this.profileCheckService.checkExistingProfileByUserId(otherId)
        if (!otherProfileExist) {
            throw new ConflictException('Other profile do not exists')
        }
        const isConnectionRequestExist = await this.connReqCheckService.checkExistingConnectionRequest(userId, coachId)
        if (!isConnectionRequestExist) {
            throw new NotFoundException('No connection request found')
        }
        const isConnectionExist = await this.connCheckService.checkExistingConnection(userId, coachId)
        if (isConnectionExist) {
            throw new ConflictException('Connection is already exists')
        }
        const {connectionRequestId, requestBy} = await this.connReqGetService.getConnectionRequestIdByIds(userId, coachId)
        if (requestBy === requesterId) {
            throw new ConflictException('Cannot accept own connection request')
        }
        try {
            return await this.connCreateService.createConnection(connectionRequestId)
        } catch (e) {
            throw new ConflictException('Unknown error :(')
        }
    }
}
