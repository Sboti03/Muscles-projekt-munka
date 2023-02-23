import {Body, Controller, Get, Patch, Post, UseGuards} from '@nestjs/common';
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
import {AuthTokenService} from "../../../auth/services/auth-token/auth-token.service";

@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileCreateController {

    constructor(private readonly profileCreateService: ProfileCreateService,
                private profileUpdateService: ProfileUpdateService,
                private profileConvertService: ProfileConvertService,
                private authTokenService:AuthTokenService) {
    }

    @Post('create')
    async createProfile(@GetCurrentUserId() userId: number, @Body() profileCreateDto: ProfileCreateDto) {
        const profileCreateInput = this.profileConvertService.convertProfileCreateDtoToInput(profileCreateDto, userId)
        const newTokens = await this.authTokenService.getTokens(userId);
        const profile = await this.profileCreateService.createProfile(profileCreateInput)
        return {
            profile,
            tokens: newTokens
        };
    }

}
