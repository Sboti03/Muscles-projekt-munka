import {Body, Controller, Delete, Patch, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../auth/guards/access-token.guard";
import {ProfileGuard} from "../../auth/guards/profile.guard";
import {AdminBlockService} from "../services/admin-block/admin-block.service";
import {AdminDeleteService} from "../services/admin-delete/admin-delete.service";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {Roles} from "../../Common/Role/decorators/ roles.decorator";
import {RolesGuard} from "../../auth/guards/role.guard";

@UseGuards(AccessTokenGuard, ProfileGuard)
@Controller('/user/admin')
export class AdminController {
    constructor(private adminBlockService: AdminBlockService, private adminDeleteService: AdminDeleteService) {
    }

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Delete()
    async deleteUserByUserId(@Body() id: number) {
        return this.adminDeleteService.deleteUserByUserId(id);
    }

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    @Patch()
    async blockUserByUserId(@Body() id: number) {
        return this.adminBlockService.blockUserByUserId(id);
    }

}
