import {ConflictException, Controller, Delete, Param, UseGuards} from '@nestjs/common';
import {
    ConnectionRequestGetService
} from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import {IdParam} from "../../../../Common/params/id.param";
import {GetCurrentUser, GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
import {ConnectionCheckService} from "../../services/connection-check/connection-check.service";
import {ConnectionDeleteService} from "../../services/connection-delete/connection-delete.service";
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
import {ApiTags} from "@nestjs/swagger";
@ApiTags('connection')
@UseGuards(AccessTokenGuard)
@Controller('connection')
export class ConnectionDeleteController {

    constructor(
        private getService: ConnectionRequestGetService,
        private checkService: ConnectionCheckService,
        private deleteService:ConnectionDeleteService) {
    }

    @Delete(':id')
    async deleteConnectionRequest(@Param() idParam: IdParam,
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
