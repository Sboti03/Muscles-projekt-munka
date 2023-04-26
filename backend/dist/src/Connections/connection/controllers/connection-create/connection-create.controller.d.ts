import { IdParam } from "../../../../Common/params/id.param";
import { ConnectionRequestGetService } from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import { ConnectionGetService } from "../../services/connection-get/connection-get.service";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionCreateService } from "../../services/connection-create/connection-create.service";
import { ConnectionCheckService } from "../../services/connection-check/connection-check.service";
import { ConnectionRequestCheckService } from "../../../connection-request/services/connection-request-check/connection-request-check.service";
import { UserCheckService } from "../../../../user/services/user-check/user-check.service";
export declare class ConnectionCreateController {
    private connReqGetService;
    private connGetService;
    private connCreateService;
    private connCheckService;
    private connReqCheckService;
    private userCheckService;
    constructor(connReqGetService: ConnectionRequestGetService, connGetService: ConnectionGetService, connCreateService: ConnectionCreateService, connCheckService: ConnectionCheckService, connReqCheckService: ConnectionRequestCheckService, userCheckService: UserCheckService);
    acceptConnection(idParam: IdParam, requesterId: number, requesterRole: RoleEnum): Promise<import(".prisma/client").connections>;
}
