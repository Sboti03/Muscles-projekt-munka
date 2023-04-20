import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../../Common/utils/prirsma.service";
import {ConnectionRequestGetService} from "../connection-request-get/connection-request-get.service";

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

    async isSameRole(userId: number, userId2: number) {
        const {role: {roleId: user1Role}} = await this.prismaService.users.findUnique({
            where: {userId},
            select: {role: {select: {roleId: true}}}
        })

        const {role: {roleId: user2Role}} = await this.prismaService.users.findUnique({
            where: {userId: userId2},
            select: {role: {select: {roleId: true}}}
        })
        return user1Role === user2Role
    }



}
