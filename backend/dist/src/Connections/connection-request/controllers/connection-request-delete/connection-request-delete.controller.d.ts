import { IdParam } from "../../../../Common/params/id.param";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionRequestGetService } from "../../services/connection-request-get/connection-request-get.service";
import { ConnectionRequestCheckService } from "../../services/connection-request-check/connection-request-check.service";
import { ConnectionRequestDeleteService } from "../../services/connection-request-delete/connection-request-delete.service";
export declare class ConnectionRequestDeleteController {
    private getService;
    private checkService;
    private deleteService;
    constructor(getService: ConnectionRequestGetService, checkService: ConnectionRequestCheckService, deleteService: ConnectionRequestDeleteService);
    deleteConnectionRequest(idParam: IdParam, requesterId: number, requesterRole: RoleEnum): Promise<import(".prisma/client").connectionRequest>;
}
