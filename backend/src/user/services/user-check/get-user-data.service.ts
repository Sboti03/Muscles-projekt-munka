import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../../utils/prirsma.service';
import {compareData} from '../../../utils/bcrypt';
import {UserGetService} from '../user-get/user-get.service';
import {Prisma} from "@prisma/client";

@Injectable()
export class UserCheckService {
   constructor(
      private prismaService: PrismaService,
      private getUserService: UserGetService,
   ) {
   }

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
      for (let token of user.refreshTokens) {
         if (compareData(refreshToken, token)) {
            return true
         }
      }
      return false
   }

   async checkExistingUserByEmail(email: string): Promise<boolean> {
      const user = await this.getUserService.getUserByEmail(email)
      return !!user
   }
}
