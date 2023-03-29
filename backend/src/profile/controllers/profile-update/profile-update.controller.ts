import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get, HttpCode, HttpStatus,
    Logger, NotFoundException, Param,
    Patch,
    Post, Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {GetCurrentUserId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {ProfileCreateService} from "../../services/profile-create/profile-create.service";
import ProfileCreateDto from "../../dto/profile-create.dto";
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {ProfileUpdateService} from "../../services/profile-update/profile-update.service";
import {ProfileConvertService} from "../../services/profile-convert/profile-convert.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {ProfileGetService} from "../../services/profile-get/profile-get.service";
import { Express, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { saveImageToStorage } from "../../../Image/image-store";
import { ImageService } from "../../../Image/image.service";
import { IdParam } from "../../../Common/params/id.param";
import { doc } from "prettier";
import { join } from 'path';
import { ProfileCheckService } from "../../services/profile-check/profile-check.service";
import { ProfileImageService } from "../../services/profile-image/profile-image.service";
@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileUpdateController {

    constructor(private readonly profileCreateService: ProfileCreateService,
                private profileUpdateService: ProfileUpdateService,
                private profileConvertService: ProfileConvertService,
                private profileImageService:ProfileImageService) {}
    @Patch('update')
    async updateProfile(@GetCurrentUserProfileId() profileId: number, @Body() profileUpdateDto: ProfileUpdateDto) {
        const profileUpdateInput = this.profileConvertService.convertProfileUpdateDtoToInput(profileUpdateDto)
        return this.profileUpdateService.updateProfile(profileId, profileUpdateInput);
    }
}
