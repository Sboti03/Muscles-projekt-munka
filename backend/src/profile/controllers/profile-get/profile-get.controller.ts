import {Controller, Get, Logger, NotFoundException, Param, UseGuards} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, GetCurrentUserProfileId } from "../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {ProfileGetService} from "../../services/profile-get/profile-get.service";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import {IdParam} from "../../../Common/params/id.param";

@UseGuards(AccessTokenGuard)
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

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Get('all')
    async getAllProfile() {
        return this.profileGetService.getAllProfileAllData();
    }

    @Get('search/name/:name')
    async getProfileByName(@Param('name') name: string, @GetCurrentUser('role') role: string,
                           @GetCurrentUserProfileId() profileId: number) {
        Logger.log(`Searching for ${name} profileId: ${profileId} [${role}]`)
        if (role === RoleEnum.USER) {
            return this.profileGetService.getProfiles(name, RoleEnum.COACH, profileId)
        } else if (role === RoleEnum.COACH) {
            return this.profileGetService.getProfiles(name, RoleEnum.USER, profileId)
        } else {
            return this.profileGetService.getAllProfilesByName(name)
        }
    }

    @Get('search/id/:id')
    async getProfileDataById(@Param() idParam: IdParam) {
        Logger.log('Searching for ' + idParam.id)
        try {
            return await this.profileGetService.getProfileDataByProfileId(idParam.id)

        }catch (e) {
            throw new NotFoundException('No profile found')
        }
    }





}
