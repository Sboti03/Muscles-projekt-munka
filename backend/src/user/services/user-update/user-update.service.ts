import { ConflictException, Injectable } from '@nestjs/common';
import { encryptData } from '../../../utils/bcrypt';
import { PrismaService } from '../../../utils/prirsma.service';
import { UserCheckService } from '../user-check/user-check.service';
import { UserGetService } from '../user-get/user-get.service';

@Injectable()
export class UserUpdateService {
  constructor(
    private userGetService: UserGetService,
    private prismaService: PrismaService,
    private checkUserService: UserCheckService,
  ) {}
  async updatePassword(password: string, userId: number) {
    if (await this.checkUserService.checkPassword(password, userId)) {
      throw new ConflictException('Cannot be the same password');
    }
    password = encryptData(password);
    return this.prismaService.users.update({
      data: { password },
      where: { userId },
    });
  }
  async pushNewRefreshToken(refreshToken: string, userId: number) {
    return this.prismaService.users.update({
      data: {
        refreshTokens: {
          push: encryptData(refreshToken),
        },
      },
      where: { userId },
    });
  }
  async updateEmail(email: string, userId: number) {
    if (await this.checkUserService.checkEmail(email, userId)) {
      throw new ConflictException('Cannot be the same email');
    }
    return this.prismaService.users.update({
      data: { email },
      where: { userId },
    });
  }
}
