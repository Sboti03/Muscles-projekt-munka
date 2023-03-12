import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {ProfileGetService} from "../../services/profile-get/profile-get.service";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import {IdParam} from "../../../Common/params/id.param";

@UseGuards(AccessTokenGuard, ProfileGuard)
@Controller('profile')
export class ProfileGetController {

    constructor(private profileGetService: ProfileGetService) {}

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Get('admin/all')
    async getAllProfileAdminVersion() {
        return this.profileGetService.getAllProfileAllData();
    }

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Get('admin/id/:id')
    async getAllProfileDataById(@Param() idParam: IdParam) {
        return this.profileGetService.getAllProfileDataByProfileId(idParam.id)
    }


    @Get('/')
    async getProfileData(@GetCurrentUserProfileId() profileId: number) {
        return this.profileGetService.getAllProfileDataByProfileId(profileId)
    }

    @Get('all')
    async getAllProfile() {
        return this.profileGetService.getAllProfileAllData();
    }

    @Get('/:id')
    async getProfileDataById(@Param() idParam: IdParam) {
        try {
            return await this.profileGetService.getProfileDataByProfileId(idParam.id)

        }catch (e) {
            throw new NotFoundException('No profile found')
        }
    }





}
