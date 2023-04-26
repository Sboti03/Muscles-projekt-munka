import {ConflictException, Injectable, Logger} from '@nestjs/common';
import {compareData} from '../../../Common/utils/bcrypt';
import {UserCheckService} from '../user-check/user-check.service';
import {PrismaService} from '../../../Common/utils/prirsma.service';
import {UserGetService} from '../user-get/user-get.service';
import * as argon2 from 'argon2'

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

        for (const token of refreshTokens) {
            const result = await argon2.verify(token, refreshToken)
            if (!result) {
                Logger.log('Not match')
                newTokens.push(token)
            } else {
                Logger.log('Match')
            }
        }

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
