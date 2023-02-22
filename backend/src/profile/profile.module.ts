import {Module} from '@nestjs/common';
import {ProfileGetService} from './services/profile-get/profile-get.service';
import {ProfileController} from './controllers/profile/profile.controller';
import {ProfileCreateService} from './services/profile-create/profile-create.service';
import {ProfileUpdateService} from './services/profile-update/profile-update.service';
import {ProfileDeleteService} from './services/profile-delete/profile-delete.service';
import {PrismaService} from "../utils/prirsma.service";
import {APP_GUARD} from "@nestjs/core";
import {AccessTokenGuard} from "../auth/guards/access-token.guard";
import {ProfileConvertService} from "./services/profile-convert/profile-convert.service";

@Module({
    providers: [
        ProfileGetService,
        ProfileCreateService,
        ProfileUpdateService,
        ProfileDeleteService,
        ProfileConvertService,
        PrismaService
    ],
    controllers: [ProfileController]
})
export class ProfileModule {
}
