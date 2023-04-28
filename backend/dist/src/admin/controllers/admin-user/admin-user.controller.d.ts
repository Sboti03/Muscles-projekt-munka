import { AdminBlockService } from "../../services/admin-block/admin-block.service";
import { AdminDeleteService } from "../../services/admin-delete/admin-delete.service";
import { IdParam } from "../../../Common/params/id.param";
export declare class AdminUserController {
    private adminBlockService;
    private adminDeleteService;
    constructor(adminBlockService: AdminBlockService, adminDeleteService: AdminDeleteService);
    deleteUserByUserId(idParam: IdParam): Promise<import(".prisma/client").users>;
    blockUserByUserId(id: number): Promise<import(".prisma/client").users>;
}
