import {Module} from '@nestjs/common';
import {ProfileGetService} from './services/profile-get/profile-get.service';
import {ProfileCreateController} from './controllers/profile-create/profile-create.controller';
import {ProfileCreateService} from './services/profile-create/profile-create.service';
import {ProfileUpdateService} from './services/profile-update/profile-update.service';
import {ProfileDeleteService} from './services/profile-delete/profile-delete.service';
import {PrismaService} from "../Common/utils/prirsma.service";
import {APP_GUARD} from "@nestjs/core";
import {AccessTokenGuard} from "../auth/guards/access-token.guard";
import {ProfileConvertService} from "./services/profile-convert/profile-convert.service";
import {ProfileUpdateController} from "./controllers/profile-update/profile-update.controller";
import {ProfileGetController} from "./controllers/profile-get/profile-get.controller";
import {AuthModule} from "../auth/auth.module";
import {ProfileCheckService} from './services/profile-check/profile-check.service';
import { ImageService } from "../Image/image.service";
import { ProfileImageService } from "./services/profile-image/profile-image.service";
import { ProfileImageController } from './controllers/profile-image/profile-image.controller';

@Module({
    imports: [AuthModule],
    providers: [
        ProfileGetService,
        ProfileCreateService,
        ProfileUpdateService,
        ProfileDeleteService,
        ProfileConvertService,
        PrismaService,
        ProfileCheckService,
        ImageService,
        ProfileImageService
    ],
    controllers: [ProfileCreateController, ProfileUpdateController, ProfileGetController, ProfileImageController],
    exports:
        [ProfileGetService,
        ProfileCreateService,
        ProfileUpdateService,
        ProfileDeleteService,
        ProfileConvertService,
        PrismaService,
        ProfileCheckService
    ]
})
export class ProfileModule {
}
