import {Controller, Get, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
import {GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {ProfileGuard} from "../../../../auth/guards/profile.guard";
import {ConnectionRequestGetService} from "../../services/connection-request-get/connection-request-get.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('connection-request')
@UseGuards(AccessTokenGuard)
@Controller('connection-request')
export class ConnectionRequestGetController {

    constructor(private getService: ConnectionRequestGetService) {
    }

    @UseGuards(ProfileGuard)
    @Get('/all')
    async createConnectionRequest(@GetCurrentUserId() userId: number) {
        return this.getService.getAllByUserId(userId)
    }

}
