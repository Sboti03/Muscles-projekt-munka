import { ConnectionRequestGetService } from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import { IdParam } from "../../../../Common/params/id.param";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionCheckService } from "../../services/connection-check/connection-check.service";
import { ConnectionDeleteService } from "../../services/connection-delete/connection-delete.service";
export declare class ConnectionDeleteController {
    private getService;
    private checkService;
    private deleteService;
    constructor(getService: ConnectionRequestGetService, checkService: ConnectionCheckService, deleteService: ConnectionDeleteService);
    deleteConnectionRequest(idParam: IdParam, requesterId: number, requesterRole: RoleEnum): Promise<import(".prisma/client").connections>;
}
