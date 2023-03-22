import {Body, Controller, Delete, Param, Patch, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import {AdminBlockService} from "../../services/admin-block/admin-block.service";
import {AdminDeleteService} from "../../services/admin-delete/admin-delete.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {IdParam} from "../../../Common/params/id.param";

@UseGuards(AccessTokenGuard)
@Roles(RoleEnum.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/user')
export class AdminUserController {
    constructor(private adminBlockService: AdminBlockService, private adminDeleteService: AdminDeleteService) {
    }


    @Delete(':id')
    async deleteUserByUserId(@Param('id') idParam: IdParam) {
        return this.adminDeleteService.deleteUserByUserId(idParam.id);
    }

    @Patch('/block')
    async blockUserByUserId(@Body() id: number) {
        return this.adminBlockService.blockUserByUserId(id);
    }

}
