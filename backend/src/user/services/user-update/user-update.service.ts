import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import {encryptData} from '../../../Common/utils/bcrypt';
import {PrismaService} from '../../../Common/utils/prirsma.service';
import {UserCheckService} from '../user-check/user-check.service';
import {UserGetService} from '../user-get/user-get.service';

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
            throw new NotFoundException('Password is not the same');
        }
        const isNewPasswordNotTheSame = await this.checkUserService.checkPassword(newPassword, userId)
        if (isNewPasswordNotTheSame) {
            throw new BadRequestException('Cannot be the same password');
        }
        newPassword = encryptData(newPassword);
        return this.prismaService.users.update({
            data: {password: newPassword},
            where: {userId},
        });
    }

    async pushNewRefreshToken(refreshToken: string, userId: number) {
        return this.prismaService.users.update({
            data: {
                refreshTokens: {
                    push: encryptData(refreshToken),
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
