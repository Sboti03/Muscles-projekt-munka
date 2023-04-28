import {Body, ConflictException, Controller, Delete, Param, UseGuards} from '@nestjs/common';
import {
    ConnectionRequestGetService
} from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import {
    ConnectionRequestCheckService
} from "../../../connection-request/services/connection-request-check/connection-request-check.service";
import {
    ConnectionRequestDeleteService
} from "../../../connection-request/services/connection-request-delete/connection-request-delete.service";
import {ProfileGuard} from "../../../../auth/guards/profile.guard";
import {IdParam} from "../../../../Common/params/id.param";
import {GetCurrentUser, GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
import {ConnectionCheckService} from "../../services/connection-check/connection-check.service";
import {ConnectionDeleteService} from "../../services/connection-delete/connection-delete.service";

@Controller('connection')
export class ConnectionDeleteController {

    constructor(
        private getService: ConnectionRequestGetService,
        private checkService: ConnectionCheckService,
        private deleteService:ConnectionDeleteService) {
    }

    @UseGuards(ProfileGuard)
    @Delete(':id')
    async deleteConnectionRequest(@Param('id') idParam: IdParam,
                                  @GetCurrentUserId() requesterId: number,
                                  @GetCurrentUser('role') requesterRole: RoleEnum) {
        if (idParam.id === requesterId) {
            throw new ConflictException('Own id')
        }
        const {userId, coachId} = this.getService.getUserAndCoachId(idParam.id, requesterId, requesterRole)
        const isConnectionExists = await this.checkService.checkExistingConnection(userId, coachId)
        if (!isConnectionExists) {
            throw new ConflictException('No connection request found')
        }
        return this.deleteService.deleteConnection(userId, coachId)
    }
}
