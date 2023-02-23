import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {ConnectionRequestGetService} from "../connection-request-get/connection-request-get.service";

@Injectable()
export class ConnectionRequestCheckService {


    constructor(private prismaService:PrismaService,
                private getService:ConnectionRequestGetService) {
    }

    async checkExistingConnectionRequest(userId: number, coachId: number) {
        try {
            await this.getService.getConnectionRequestIdByIds(userId, coachId)
            return false
        } catch (e) {
            return true
        }
    }

}
