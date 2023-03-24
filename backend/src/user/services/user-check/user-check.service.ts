import {Injectable, Logger} from '@nestjs/common';
import { PrismaService } from '../../../Common/utils/prirsma.service';
import { compareData } from '../../../Common/utils/bcrypt';
import { UserGetService } from '../user-get/user-get.service';

@Injectable()
export class UserCheckService {
  constructor(
    private prismaService: PrismaService,
    private getUserService: UserGetService,
  ) {}

  async checkEmail(email: string, userId: number) {
    const user = await this.getUserService.getUserById(userId);
    return email === user.email;
  }

  async checkPassword(password: string, userId: number) {
    const user = await this.getUserService.getUserById(userId);
    return compareData(password, user.password);
  }

  async checkRefreshToken(refreshToken: string, userId: number) {
    const user = await this.getUserService.getUserById(userId);

    if (user && user.refreshTokens) {
      for (const token of user.refreshTokens) {
        if (compareData(refreshToken, token)) {
          Logger.log('Token match')
          return true;
        }
      }
    }
    return false;
  }

  async checkUserById(userId: number) {
    try {
      const res = await this.getUserService.getUserById(userId)
      return !res.isBlocked
    } catch (e) {
      return false
    }
  }

  async checkExistingUserByEmail(email: string): Promise<boolean> {
    const user = await this.getUserService.getUserByEmail(email);
    return !!user;
  }

  async isUserBlocked(userId: number) {
    return (await this.prismaService.users.findUnique({
      where: {userId},
      select: {isBlocked: true}
    })).isBlocked
  }
}
