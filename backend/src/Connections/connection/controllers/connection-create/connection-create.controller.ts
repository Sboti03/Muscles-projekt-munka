import {
    BadRequestException,
    Controller,
    ForbiddenException,
    NotFoundException, Param,
    Post,
    UseGuards
} from "@nestjs/common";
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
import {ConnectionCheckService} from "../../services/connection-check/connection-check.service";
import {
    ConnectionRequestCheckService
} from "../../../connection-request/services/connection-request-check/connection-request-check.service";
import { UserCheckService } from "../../../../user/services/user-check/user-check.service";


@UseGuards(AccessTokenGuard)
@Controller('connection')
export class ConnectionCreateController {

    constructor(private connReqGetService: ConnectionRequestGetService,
                private connGetService: ConnectionGetService,
                private connCreateService: ConnectionCreateService,
                private connCheckService:ConnectionCheckService,
                private connReqCheckService:ConnectionRequestCheckService,
                private userCheckService: UserCheckService) {
    }


    @UseGuards(ProfileGuard)
    @Post('/accept/:id')
    async acceptConnection(@Param() idParam: IdParam,
                           @GetCurrentUserId() requesterId: number,
                           @GetCurrentUser('role') requesterRole: RoleEnum) {
        if (idParam.id === requesterId) {
            throw new BadRequestException('Cannot accept own connection request')
        }
        const {userId, coachId} = this.connReqGetService.getUserAndCoachId(idParam.id, requesterId, requesterRole)
        const isConnectionRequestExist = await this.connReqCheckService.checkExistingConnectionRequest(userId, coachId)
        if (!isConnectionRequestExist) {
            throw new NotFoundException('No connection request found')
        }
        const isConnectionExist = await this.connCheckService.checkExistingConnection(userId, coachId)
        if (isConnectionExist) {
            throw new BadRequestException('Connection is already exists')
        }
        const isUserBlocked = await this.userCheckService.isUserBlocked(idParam.id)
        if (isUserBlocked) {
            throw new ForbiddenException("Other user is banned")
        }

        const {connectionRequestId, accessAll} = await this.connReqGetService.getConnectionRequestIdByIds(userId, coachId)
        if (accessAll) {
            const isAccessAllConnectionExist = await this.connCheckService.checkExistingAccessAllConnection(userId)
            if (isAccessAllConnectionExist) {
                throw new ForbiddenException("User already has a main coach")
            }
        }

        try {
            return await this.connCreateService.createConnection(connectionRequestId)
        } catch (e) {
            throw new BadRequestException('Unknown error :(')
        }
    }
}
