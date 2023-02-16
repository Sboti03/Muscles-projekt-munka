import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt/dist';
import {JwtPayload} from '../types/jwt-payload';
import {Tokens} from '../types/token';
import {UserGetService} from "../../user/services/user-get/user-get.service";
import {compareData} from "../../utils/bcrypt";
import LoginDto from "../dto/login.dto";
import {UserUpdateService} from "../../user/services/user-update/user-update.service";
import {CreateUserDTO} from "../../user/dto/createUserDTO";
import {UserCheckService} from "../../user/services/user-check/get-user-data.service";
import {UserCreateService} from "../../user/services/user-create/user-create.service";

@Injectable()
export class AuthService {


   constructor(private jwtService: JwtService,
               private userGetService: UserGetService,
               private userUpdateService: UserUpdateService,
               private userCheckService: UserCheckService,
               private userCreateService: UserCreateService) {
   }

   async validateUser(loginDto: LoginDto) {
      const user = await this.userGetService.getUserByEmail(loginDto.email)
      if (!user) throw new ForbiddenException('No user found')

      const passMatch: boolean = compareData(loginDto.password, user.password);
      if (!passMatch) throw new ForbiddenException('Access Denied')

      const {password, refreshToken, ...rest} = user
      const tokens = await this.getTokens(user.userId, user.email)
      await this.userUpdateService.updateRefreshToken(tokens.refreshToken, user.userId)
      return {
         user: rest,
         tokens
      }
   }


   async getTokens(userId: number, email: string): Promise<Tokens> {
      const jwtPayload: JwtPayload = {
         sub: userId,
         email: email,
      };

      const [accessToken, refreshToken] = await Promise.all([
         this.jwtService.signAsync(jwtPayload, {
            secret: process.env.AT_SECRET,
            expiresIn: process.env.AT_EXPIRES,
         }),
         this.jwtService.signAsync(jwtPayload, {
            secret: process.env.RT_SECRET,
            expiresIn: process.env.RT_EXPIRES,
         },),
      ]);

      return {
         accessToken,
         refreshToken
      };
   }

   async logOut(userId: number) {
      return await this.userUpdateService.updateRefreshToken('', userId)
   }

   async register(createUserDto: CreateUserDTO) {
      const exist = await this.userCheckService.checkExistingUserByEmail(createUserDto.email)
      if (exist) throw new ForbiddenException('User already exists')

      const userInput = await this.userGetService.getUsersCreateInput(createUserDto)
      const user = await this.userCreateService.createUser(userInput)
      const {password, ...rest} = user
      const tokens = await this.getTokens(user.userId, user.email)
      await this.userUpdateService.updateRefreshToken(tokens.refreshToken, user.userId)
      return {
         user: rest,
         tokens
      }
   }

   async getNewRefreshToken(userId: number, refreshToken: string) {
      const user = await this.userGetService.getUserById(userId)
      if (!user) throw new ForbiddenException('No user found')
      const isTokenMatch = compareData(refreshToken, user.refreshToken)

   }

}
