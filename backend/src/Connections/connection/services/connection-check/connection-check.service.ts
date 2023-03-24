import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";
import {ConnectionGetService} from "../connection-get/connection-get.service";

@Injectable()
export class ConnectionCheckService {
    constructor(private prismaService:PrismaService,
                private getService:ConnectionGetService) {
    }

    async checkExistingConnection(userId: number, coachId: number) {
        try {
            await this.getService.getConnectionByIds(userId, coachId);
        } catch (e) {
            return false
        }

        return true
    }

    async checkExistingAccessAllConnection(userId: number) {
        try {
            await this.getService.getAccessAllConnection(userId)
            return true
        } catch (e) {
            return false
        }
    }

    async checkAccessCoachToUser(userId: number, coachId: number) {
        try {
            await this.getService.getConnectionByIds(userId, coachId)
        } catch (e) {

        }
    }
}
