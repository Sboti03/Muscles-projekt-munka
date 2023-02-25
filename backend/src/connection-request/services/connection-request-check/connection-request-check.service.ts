import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {ConnectionRequestGetService} from "../connection-request-get/connection-request-get.service";
import {ConnectionGetService} from "../../../connection/services/connection-get/connection-get.service";

@Injectable()
export class ConnectionRequestCheckService {


    constructor(private prismaService:PrismaService,
                private getService:ConnectionRequestGetService,
                private connectionGetService:ConnectionGetService) {
    }

    async checkExistingConnectionRequest(userId: number, coachId: number) {
        try {
            await this.connectionGetService.getConnectionByIds(userId, coachId)
            await this.getService.getConnectionRequestIdByIds(userId, coachId)
            return false
        } catch (e) {
            return true
        }
    }



}
