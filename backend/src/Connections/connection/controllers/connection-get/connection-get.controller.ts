import {Controller, Get, UseGuards} from '@nestjs/common';
import {ConnectionGetService} from "../../services/connection-get/connection-get.service";
import {GetCurrentUserId} from "../../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../../auth/guards/access-token.guard";
@UseGuards(AccessTokenGuard)
@Controller('connection')
export class ConnectionGetController {
    constructor(private conGetService:ConnectionGetService) {
    }

    @Get('all')
    async getAllConnection(@GetCurrentUserId() userId: number) {
        return this.conGetService.getAllConnection(userId)
    }
}
