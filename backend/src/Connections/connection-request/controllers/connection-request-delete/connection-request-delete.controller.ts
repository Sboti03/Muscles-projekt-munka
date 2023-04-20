import {
    BadRequestException,
    ConflictException,
    Controller,
    Delete,
    Param,
    UseGuards
} from "@nestjs/common";
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
import {IdParam} from "../../../../Common/params/id.param";
import {GetCurrentUser, GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
import {ConnectionRequestGetService} from "../../services/connection-request-get/connection-request-get.service";
import {ConnectionRequestCheckService} from "../../services/connection-request-check/connection-request-check.service";
import {
    ConnectionRequestDeleteService
} from "../../services/connection-request-delete/connection-request-delete.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('connection-request')
@UseGuards(AccessTokenGuard)
@Controller('connection-request')
export class ConnectionRequestDeleteController {

    constructor(
                private getService: ConnectionRequestGetService,
                private checkService: ConnectionRequestCheckService,
                private deleteService:ConnectionRequestDeleteService) {
    }

    @Delete(':id')
    async deleteConnectionRequest(@Param() idParam: IdParam,
                                  @GetCurrentUserId() requesterId: number,
                                  @GetCurrentUser('role') requesterRole: RoleEnum) {
        if (idParam.id === requesterId) {
            throw new BadRequestException("Own id")
        }
        const {userId, coachId} = this.getService.getUserAndCoachId(idParam.id, requesterId, requesterRole)
        const isConnectionRequestExist = await this.checkService.checkExistingConnectionRequest(userId, coachId)
        if (!isConnectionRequestExist) {
            throw new ConflictException('No connection request found')
        }
        return this.deleteService.deleteConnection(userId, coachId)
    }
}
