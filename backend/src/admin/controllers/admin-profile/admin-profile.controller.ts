import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Roles } from "../../../Common/Role/decorators/ roles.decorator";
import { RoleEnum } from "../../../Common/Role/utils/roles";
import { RolesGuard } from "../../../auth/guards/role.guard";
import { IdParam } from "../../../Common/params/id.param";
import { AccessTokenGuard } from "../../../auth/guards/access-token.guard";
import { ProfileGetService } from "../../../profile/services/profile-get/profile-get.service";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {profileData} from "@prisma/client";
import AllProfileResponse from "../response/profile.response";
@ApiTags('admin/profile')
@Roles(RoleEnum.ADMIN)
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('admin/profile')
export class AdminProfileController {

    constructor(private profileGetService: ProfileGetService) {
    }



    @Get('admin/id/:id')
    async getAllProfileDataById(@Param() idParam: IdParam) {
        return this.profileGetService.getAllProfileDataByProfileId(idParam.id)
    }
    @Get('all')
    @Get('admin/all')
    @ApiOkResponse({
        type: AllProfileResponse
    })
    async getAllProfile() {
        return this.profileGetService.getAllProfileAllData();
    }
}

