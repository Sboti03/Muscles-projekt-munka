import { ConflictException, Injectable } from '@nestjs/common';
import { encryptData } from '../../../utils/bcrypt';
import { PrismaService } from '../../../utils/prirsma.service';
import { UserCheckService } from '../user-check/get-user-data.service';

@Injectable()
export class UserUpdateService {
  constructor(
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
  async updateRefreshToken(refreshToken: string, userId: number) {
    if (await this.checkUserService.checkRefreshToken(refreshToken, userId)) {
      throw new ConflictException('Cannot be the same refreshToken');
    }
    refreshToken = encryptData(refreshToken);
    return this.prismaService.users.update({
      data: { refreshToken },
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
