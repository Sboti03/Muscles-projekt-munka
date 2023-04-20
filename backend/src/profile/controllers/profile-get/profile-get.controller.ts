import {Controller, Get, Logger, NotFoundException, Param, UseGuards} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserProfileId } from "../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {ProfileGetService} from "../../services/profile-get/profile-get.service";
import {IdParam} from "../../../Common/params/id.param";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('profile')
@UseGuards(AccessTokenGuard)
@Controller('profile')
export class ProfileGetController {

    constructor(private profileGetService: ProfileGetService) {}


    @Get('/')
    async getProfileData(@GetCurrentUserProfileId() profileId: number) {
        return this.profileGetService.getAllProfileDataByProfileId(profileId)
    }



    @Get('search/name/:name')
    async getProfileByName(@Param('name') name: string, @GetCurrentUser('role') role: string,
                           @GetCurrentUserProfileId() profileId: number) {
        Logger.log(`Searching for ${name} profileId: ${profileId} [${role}]`)
        if (role === RoleEnum.USER) {
            Logger.log(`Search for Coach`)

            return this.profileGetService.getProfiles(name, RoleEnum.COACH, profileId)
        } else if (role === RoleEnum.COACH) {
            Logger.log(`Search for user`)
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
