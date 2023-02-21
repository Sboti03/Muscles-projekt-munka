import { Module } from '@nestjs/common';
import { ProfileGetService } from './services/profile-get/profile-get.service';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileCreateService } from './services/profile-create/profile-create.service';
import { ProfileUpdateService } from './services/profile-update/profile-update.service';
import { ProfileDeleteService } from './services/profile-delete/profile-delete.service';
import {PrismaService} from "../utils/prirsma.service";

@Module({
  providers: [ProfileGetService, ProfileCreateService, ProfileUpdateService, ProfileDeleteService, PrismaService],
  controllers: [ProfileController]
})
export class ProfileModule {}
