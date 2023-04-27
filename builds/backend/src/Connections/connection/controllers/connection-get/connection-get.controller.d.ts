import { ConnectionGetService } from "../../services/connection-get/connection-get.service";
import { IdParam } from "../../../../Common/params/id.param";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionCheckService } from "../../services/connection-check/connection-check.service";
export declare class ConnectionGetController {
    private conGetService;
    private connectionCheckService;
    constructor(conGetService: ConnectionGetService, connectionCheckService: ConnectionCheckService);
    getAllConnection(userId: number): Promise<{
        userId: number;
        coachId: number;
        accessAll: boolean;
        connectionId: number;
    }[]>;
    getConnectionById(idParam: IdParam, currentUserId: number, role: RoleEnum): Promise<import(".prisma/client").connections>;
}
