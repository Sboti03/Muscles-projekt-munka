import {Body, Controller, Patch, UseGuards} from "@nestjs/common";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {ProfileCreateService} from "../../services/profile-create/profile-create.service";
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {ProfileUpdateService} from "../../services/profile-update/profile-update.service";
import {ProfileConvertService} from "../../services/profile-convert/profile-convert.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('profile')
@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileUpdateController {

    constructor(private readonly profileCreateService: ProfileCreateService,
                private profileUpdateService: ProfileUpdateService,
                private profileConvertService: ProfileConvertService) {
    }

    @Patch('update')
    async updateProfile(@GetCurrentUserProfileId() profileId: number, @Body() profileUpdateDto: ProfileUpdateDto) {
        const profileUpdateInput = this.profileConvertService.convertProfileUpdateDtoToInput(profileUpdateDto)
        return this.profileUpdateService.updateProfile(profileId, profileUpdateInput);
    }
}
