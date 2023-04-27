import {Controller, Delete, Get, Logger, NotFoundException, Param, Patch, Query, UseGuards} from "@nestjs/common";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {AdminBlockService} from "../../services/admin-block/admin-block.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {IdParam} from "../../../Common/params/id.param";
import { UserGetService } from "../../../user/services/user-get/user-get.service";
import {ApiTags} from "@nestjs/swagger";
@ApiTags('admin/user')
@Roles(RoleEnum.ADMIN)
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('admin/user')
export class AdminUserController {
    constructor(private adminBlockService: AdminBlockService,
                private userGetService: UserGetService) {
    }

    @Delete('/block/:id')
    async blockUserByUserId(@Param() idParam: IdParam) {
        return this.adminBlockService.blockUserByUserId(idParam.id);
    }


    @Delete('delete-all/')
    async deleteAllData(@Query('email') email: string) {
        Logger.log(`delete all data for ${email}`)
        try {
            return await this.adminBlockService.deleteAllUserData(email)
        } catch (e) {
            throw new NotFoundException('No user found')
        }
    }

    @Patch('/unblock/:id')
    async unBlockUserById(@Param() idParam: IdParam) {
        return this.adminBlockService.unblockUserById(idParam.id)
    }


    @Get('all')
    async getAllUser() {
        return this.userGetService.getAllUser();
    }
}
