import { IdParam } from "../../../../Common/params/id.param";
import { ConnectionRequestGetService } from "../../../connection-request/services/connection-request-get/connection-request-get.service";
import { ConnectionGetService } from "../../services/connection-get/connection-get.service";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionCreateService } from "../../services/connection-create/connection-create.service";
import { ProfileCheckService } from "../../../../profile/services/profile-check/profile-check.service";
import { ConnectionCheckService } from "../../services/connection-check/connection-check.service";
import { ConnectionRequestCheckService } from "../../../connection-request/services/connection-request-check/connection-request-check.service";
export declare class ConnectionCreateController {
    private connReqGetService;
    private connGetService;
    private connCreateService;
    private profileCheckService;
    private connCheckService;
    private connReqCheckService;
    constructor(connReqGetService: ConnectionRequestGetService, connGetService: ConnectionGetService, connCreateService: ConnectionCreateService, profileCheckService: ProfileCheckService, connCheckService: ConnectionCheckService, connReqCheckService: ConnectionRequestCheckService);
    acceptConnection(idParam: IdParam, requesterId: number, requesterRole: RoleEnum): Promise<import(".prisma/client").connections>;
}
