import {Body, ConflictException, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {IdParam} from "../../../params/id.param";
import {GetCurrentUser, GetCurrentUserId} from "../../../auth/decorators/decorators";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import {RoleEnum} from "../../../Role/utils/roles";
import {UserGetService} from "../../../user/services/user-get/user-get.service";
import {ConnectionRequestGetService} from "../../services/connection-request-get/connection-request-get.service";
import {ConnectionRequestCheckService} from "../../services/connection-request-check/connection-request-check.service";
import {
    ConnectionRequestCreateService
} from "../../services/connection-request-create/connection-request-create.service";

@UseGuards(AccessTokenGuard)
@Controller('connection-request')
export class ConnectionRequestGetController {

    constructor(private userGetService: UserGetService,
                private getService: ConnectionRequestGetService,
                private checkService: ConnectionRequestCheckService,
                private createService:ConnectionRequestCreateService) {
    }

    @UseGuards(ProfileGuard)
    @Get('/all')
    async createConnectionRequest(@GetCurrentUserId() userId: number) {
        return this.getService.getAllByUserId(userId)
    }

}
