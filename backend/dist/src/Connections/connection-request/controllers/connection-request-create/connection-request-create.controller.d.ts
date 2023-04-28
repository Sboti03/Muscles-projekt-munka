import { IdParam } from "../../../../Common/params/id.param";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionRequestGetService } from "../../services/connection-request-get/connection-request-get.service";
import { ConnectionRequestCheckService } from "../../services/connection-request-check/connection-request-check.service";
import { ConnectionRequestCreateService } from "../../services/connection-request-create/connection-request-create.service";
import { ConnectionCheckService } from "../../../connection/services/connection-check/connection-check.service";
import { ProfileCheckService } from "../../../../profile/services/profile-check/profile-check.service";
export declare class ConnectionRequestCreateController {
    private getService;
    private checkService;
    private createService;
    private connectionCheckService;
    private profileCheckService;
    constructor(getService: ConnectionRequestGetService, checkService: ConnectionRequestCheckService, createService: ConnectionRequestCreateService, connectionCheckService: ConnectionCheckService, profileCheckService: ProfileCheckService);
    createConnectionRequest(idParam: IdParam, requesterId: number, requesterRole: RoleEnum): Promise<import(".prisma/client").connectionRequest>;
}
