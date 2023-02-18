import {Module} from '@nestjs/common';
import {UserController} from './controller/user.controller';
import {PrismaService} from '../utils/prirsma.service';
import {UserGetService} from './services/user-get/user-get.service';
import {UserCheckService} from './services/user-check/user-check.service';
import {UserUpdateService} from './services/user-update/user-update.service';
import {UserCreateService} from './services/user-create/user-create.service';
import {UserDeleteService} from "./services/user-delete/user-delete.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [
        PrismaService,
        UserGetService,
        UserCheckService,
        UserUpdateService,
        UserCreateService,
        UserDeleteService,
    ],
    controllers: [UserController],
    exports: [
        PrismaService,
        UserGetService,
        UserCheckService,
        UserUpdateService,
        UserCreateService,
        UserDeleteService]
})
export class UserModule {
}
