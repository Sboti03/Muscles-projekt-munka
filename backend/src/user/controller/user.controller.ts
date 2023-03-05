import {Controller, Get, UseGuards} from '@nestjs/common';
import {PrismaService} from "../../Common/utils/prirsma.service";
import {AccessTokenGuard} from "../../auth/guards/access-token.guard";
import {RolesGuard} from "../../auth/guards/role.guard";
import {Roles} from "../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {UserGetService} from "../services/user-get/user-get.service";

@Controller('user')
export class UserController {

  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('all')
  async getAllUser() {
    return this.userGetService.getAllUser();
  }

  constructor(private prismaService: PrismaService,
              private userGetService:UserGetService) {}
}
