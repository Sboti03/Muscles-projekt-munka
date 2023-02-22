import {Body, Controller, Get, Post} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {ProfileCreateService} from "../../services/profile-create/profile-create.service";
import ProfileCreateDto from "../../dto/profile-create.dto";
import ProfileUpdateDto from "../../dto/profile-update.dto";

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileCreateService: ProfileCreateService) {}

    @Post('create')
    createProfile(@GetCurrentUserId() userId: number, @Body() profileCreateDto: ProfileCreateDto) {
        return  this.profileCreateService.createProfile(profileCreateDto, userId)
    }

    @Post('update')
    updateProfile(@GetCurrentUserProfileId() profileId: number, @Body() profileUpdateDto: ProfileUpdateDto) {

    }
}
