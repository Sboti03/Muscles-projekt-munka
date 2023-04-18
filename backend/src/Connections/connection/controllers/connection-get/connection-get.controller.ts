import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {ConnectionGetService} from "../../services/connection-get/connection-get.service";
import {GetCurrentUser, GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
import {IdParam} from "../../../../Common/params/id.param";
import {RoleEnum} from "../../../../Common/Role/utils/roles";
import {ConnectionCheckService} from "../../services/connection-check/connection-check.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('connection')
@UseGuards(AccessTokenGuard)
@Controller('connection')
export class ConnectionGetController {
    constructor(private conGetService: ConnectionGetService,
                private connectionCheckService: ConnectionCheckService) {
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
        return this.conGetService.getConnectionByIds(userId, coachId)
    }

}
