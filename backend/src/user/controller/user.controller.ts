import { Controller, Get, NotFoundException, Param, UseGuards } from "@nestjs/common";
import {PrismaService} from "../../Common/utils/prirsma.service";
import {AccessTokenGuard} from "../../auth/guards/access-token.guard";
import {RolesGuard} from "../../auth/guards/role.guard";
import {Roles} from "../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {UserGetService} from "../services/user-get/user-get.service";
import { IdParam } from "../../Common/params/id.param";
import { ProfileGetService } from "../../profile/services/profile-get/profile-get.service";
import { UserCheckService } from "../services/user-check/user-check.service";

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('all')
  async getAllUser() {
    return this.userGetService.getAllUser();
  }

  constructor(
              private userGetService:UserGetService,
              private profileGetService:ProfileGetService,
              private userCheckService:UserCheckService,
              ) {}


  @Get('profile/:id')
  async getProfileByUserId(@Param() idParam: IdParam) {
    const isUserExist = await this.userCheckService.checkUserById(idParam.id)
    if (!isUserExist) {
      throw new NotFoundException("No user found")
    }
    return this.profileGetService.getProfileIdByUserId(idParam.id)
  }
}
