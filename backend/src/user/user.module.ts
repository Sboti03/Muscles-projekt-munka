import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { PrismaService } from '../utils/prirsma.service';
import { UserGetService } from './services/user-get/user-get.service';
import { UserCheckService } from './services/user-check/get-user-data.service';
import { UserUpdateService } from './services/user-update/user-update.service';
import { UserCreateService } from './services/user-create/user-create.service';

@Module({
  exports: [UserModule],
  providers: [
    PrismaService,
    UserGetService,
    UserCheckService,
    UserUpdateService,
    UserCreateService,
  ],
  controllers: [UserController],
})
export class UserModule {}
