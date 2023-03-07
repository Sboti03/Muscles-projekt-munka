import {ConflictException, Injectable} from '@nestjs/common';
import {compareData} from '../../../Common/utils/bcrypt';
import {UserCheckService} from '../user-check/user-check.service';
import {PrismaService} from '../../../Common/utils/prirsma.service';
import {UserGetService} from '../user-get/user-get.service';

@Injectable()
export class UserDeleteService {
    constructor(
        private checkUserService: UserCheckService,
        private prismaService: PrismaService,
        private userGetService: UserGetService,
    ) {
    }

    async deleteRefreshTokenById(userId: number, refreshToken: string) {
        const checkedRefreshToken: boolean =
            await this.checkUserService.checkRefreshToken(refreshToken, userId);
        if (!checkedRefreshToken) {
            throw new ConflictException('No token found');
        }
        const {refreshTokens} = await this.userGetService.getTokensByUserId(
            userId,
        );

        const newTokens = refreshTokens.filter((token) => compareData(refreshToken, token))
        console.log(refreshToken)
        console.log(refreshTokens.filter(token => {
            console.log(!compareData(refreshToken, token))
            return !compareData(refreshToken, token)
        }));
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
