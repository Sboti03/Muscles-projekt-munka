import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {IdParam} from "../../../params/id.param";
import {GetCurrentUser, GetCurrentUserId} from "../../../auth/decorators/decorators";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import {RoleEnum} from "../../../Role/utils/roles";
import {UserGetService} from "../../../user/services/user-get/user-get.service";
import {ConnectionRequestGetService} from "../../services/connection-request-get/connection-request-get.service";
import {ConnectionRequestCheckService} from "../../services/connection-request-check/connection-request-check.service";

@UseGuards(AccessTokenGuard)
@Controller('connection-request')
export class ConnectionRequestController {

    constructor(private userGetService: UserGetService,
                private getService: ConnectionRequestGetService,
                private checkService: ConnectionRequestCheckService) {
    }

    @UseGuards(ProfileGuard)
    @Post('/create')
    async createConnectionRequest(@Body() idParam: IdParam,
                                  @GetCurrentUserId() userId: number,
                                  @GetCurrentUser('role') userRole: RoleEnum) {

    }
}
