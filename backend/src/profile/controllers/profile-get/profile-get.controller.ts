import {Body, Controller, Get, NotFoundException, Patch, Post, UseGuards} from '@nestjs/common';
import {GetCurrentUserId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {ProfileCreateService} from "../../services/profile-create/profile-create.service";
import ProfileCreateDto from "../../dto/profile-create.dto";
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {ProfileUpdateService} from "../../services/profile-update/profile-update.service";
import {ProfileConvertService} from "../../services/profile-convert/profile-convert.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Role/utils/roles";
import {ProfileGetService} from "../../services/profile-get/profile-get.service";

@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileGetController {

    constructor(private profileGetService: ProfileGetService) {}

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    async getAllProfile() {
        return this.profileGetService.getAllProfile();
    }

    @Get('me')
    async getProfileData(@GetCurrentUserProfileId() profileId: number) {
        if (profileId === -1) {
            throw new NotFoundException('No profile found')
        }
        return this.profileGetService.getProfileDataByProfileId(profileId)
    }


}
