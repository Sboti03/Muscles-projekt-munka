import {Body, Controller, Get, Post} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {ProfileCreateService} from "../../services/profile-create/profile-create.service";
import ProfileCreateDto from "../../dto/profile-create.dto";
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {ProfileUpdateService} from "../../services/profile-update/profile-update.service";
import {ProfileConvertService} from "../../services/profile-convert/profile-convert.service";

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileCreateService: ProfileCreateService,
                private profileUpdateService: ProfileUpdateService,
                private profileConvertService: ProfileConvertService) {}

    @Post('create')
    async createProfile(@GetCurrentUserId() userId: number, @Body() profileCreateDto: ProfileCreateDto) {
        const profileCreateInput = this.profileConvertService.convertProfileCreateDtoToInput(profileCreateDto, userId)
        return await this.profileCreateService.createProfile(profileCreateInput)
    }

    @Post('update')
    async updateProfile(@GetCurrentUserProfileId() profileId: number, @Body() profileUpdateDto: ProfileUpdateDto) {
        const profileUpdateInput = this.profileConvertService.convertProfileUpdateDtoToInput(profileUpdateDto)
        return await this.profileUpdateService.updateProfile(profileId, profileUpdateInput)
    }
}
