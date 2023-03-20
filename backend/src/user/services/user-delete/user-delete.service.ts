import {ConflictException, Injectable, Logger} from '@nestjs/common';
import {compareData} from '../../../Common/utils/bcrypt';
import {UserCheckService} from '../user-check/user-check.service';
import {PrismaService} from '../../../Common/utils/prirsma.service';
import {UserGetService} from '../user-get/user-get.service';
import * as bcrypt from 'bcrypt'
import {compareSync} from "bcrypt";

@Injectable()
export class UserDeleteService {
    constructor(
        private checkUserService: UserCheckService,
        private prismaService: PrismaService,
        private userGetService: UserGetService,
    ) {
    }

    async deleteRefreshTokenById(userId: number, refreshToken: string) {
        const {refreshTokens} = await this.userGetService.getTokensByUserId(userId);
        let newTokens = []
        Logger.log(refreshTokens)
        for (let i = 0; i < refreshTokens.length; i++) {
            Logger.log(refreshTokens[i])
            Logger.log(i)
            if (!compareData(refreshToken, refreshTokens[i])) {
                newTokens.push(refreshTokens[i])
            } else {
                Logger.log("Same token found at: " + i)
            }
        }
        Logger.log(newTokens)

        return this.prismaService.users.update({
            where: {userId},
            data: {
                refreshTokens: {
                    set: newTokens
                }
            }
        })
    }
}
