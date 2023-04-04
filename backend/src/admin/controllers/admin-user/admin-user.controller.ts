import { Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {AdminBlockService} from "../../services/admin-block/admin-block.service";
import {AdminDeleteService} from "../../services/admin-delete/admin-delete.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {IdParam} from "../../../Common/params/id.param";
import { UserGetService } from "../../../user/services/user-get/user-get.service";

@Roles(RoleEnum.ADMIN)
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('admin/user')
export class AdminUserController {
    constructor(private adminBlockService: AdminBlockService, private adminDeleteService: AdminDeleteService,
                private userGetService: UserGetService) {
    }


    @Delete(':id')
    async deleteUserByUserId(@Param() idParam: IdParam) {
        return this.adminDeleteService.deleteUserByUserId(idParam.id);
    }

    @Delete('/block/:id')
    async blockUserByUserId(@Param() idParam: IdParam) {
        return this.adminBlockService.blockUserByUserId(idParam.id);
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
