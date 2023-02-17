import { ConflictException, Injectable } from '@nestjs/common';
import { compareData } from '../../../utils/bcrypt';
import { UserCheckService } from '../user-check/user-check.service';
import { PrismaService } from '../../../utils/prirsma.service';
import { UserGetService } from '../user-get/user-get.service';

@Injectable()
export class UserDeleteService {
  constructor(
    private checkUserService: UserCheckService,
    private prismaService: PrismaService,
    private userGetService: UserGetService,
  ) {}
  async deleteRefreshTokenById(userId: number, refreshToken: string) {
    const checkedRefreshToken: boolean =
      await this.checkUserService.checkRefreshToken(refreshToken, userId);
    if (checkedRefreshToken === false) {
      throw new ConflictException('No token found');
    }
    const { refreshTokens } = await this.userGetService.getTokensByUserId(
      userId,
    );
    return this.prismaService.users.update({
      data: {
        refreshTokens: {
          set: refreshTokens.filter((token) => {
            !compareData(token, refreshToken);
          }),
        },
      },
      where: { userId },
    });
  }
}
