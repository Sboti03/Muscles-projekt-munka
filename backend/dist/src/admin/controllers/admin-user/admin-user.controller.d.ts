import { AdminBlockService } from "../../services/admin-block/admin-block.service";
import { IdParam } from "../../../Common/params/id.param";
import { UserGetService } from "../../../user/services/user-get/user-get.service";
export declare class AdminUserController {
    private adminBlockService;
    private userGetService;
    constructor(adminBlockService: AdminBlockService, userGetService: UserGetService);
    blockUserByUserId(idParam: IdParam): Promise<import(".prisma/client").users>;
    deleteAllData(email: string): Promise<import(".prisma/client").users>;
    unBlockUserById(idParam: IdParam): Promise<import(".prisma/client").users>;
    getAllUser(): Promise<(import(".prisma/client").users & {
        role: import(".prisma/client").roles;
    })[]>;
}
