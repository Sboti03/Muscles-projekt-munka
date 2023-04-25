import {BadRequestException, ConflictException, Injectable, Logger, NotFoundException} from "@nestjs/common";
import {encryptData} from '../../../Common/utils/bcrypt';
import {PrismaService} from '../../../Common/utils/prirsma.service';
import {UserCheckService} from '../user-check/user-check.service';
import {UserGetService} from '../user-get/user-get.service';
import * as argon2 from 'argon2'

@Injectable()
export class UserUpdateService {
    constructor(
        private userGetService: UserGetService,
        private prismaService: PrismaService,
        private checkUserService: UserCheckService,
    ) {
    }

    async updatePassword(oldPassword: string, newPassword: string, userId: number) {
        const isOldPasswordMatch = await this.checkUserService.checkPassword(oldPassword, userId)
        if (!isOldPasswordMatch) {
            Logger.log(`Password is not the same userId: ${userId}`)
            throw new NotFoundException('Password is not the same');
        }
        const isNewPasswordNotTheSame = await this.checkUserService.checkPassword(newPassword, userId)
        if (isNewPasswordNotTheSame) {
            Logger.log(`Cannot be the same password userId: ${userId}`)
            throw new BadRequestException('Cannot be the same password');
        }
        newPassword = encryptData(newPassword);
        Logger.log(`Password changed userId: ${userId}`)
        return this.prismaService.users.update({
            data: {
                password: newPassword,
                refreshTokens: [],
            },
            where: {userId},
        });
    }

    async pushNewRefreshToken(refreshToken: string, userId: number) {
        return this.prismaService.users.update({
            data: {
                refreshTokens: {
                    push: await argon2.hash(refreshToken),
                },
            },
            where: {userId},
        });
    }

    async updateEmail(email: string, userId: number) {
        if (await this.checkUserService.checkEmail(email, userId)) {
            throw new ConflictException('Cannot be the same email');
        }
        return this.prismaService.users.update({
            data: {email},
            where: {userId},
        });
    }
}
