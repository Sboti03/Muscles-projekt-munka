import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";
import {ConnectionRequestGetService} from "../connection-request-get/connection-request-get.service";
import {ConnectionGetService} from "../../../connection/services/connection-get/connection-get.service";

@Injectable()
export class ConnectionRequestCheckService {


    constructor(private prismaService:PrismaService,
                private getService:ConnectionRequestGetService) {
    }

    async checkExistingConnectionRequest(userId: number, coachId: number) {
        try {
            await this.getService.getConnectionRequestIdByIds(userId, coachId)
            return true
        } catch (e) {
            return false
        }
    }



}
