import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionRequestGetService } from "../../services/connection-request-get/connection-request-get.service";
import { ConnectionRequestCheckService } from "../../services/connection-request-check/connection-request-check.service";
import { ConnectionRequestCreateService } from "../../services/connection-request-create/connection-request-create.service";
import { ConnectionCheckService } from "../../../connection/services/connection-check/connection-check.service";
import ConnectionRequestDto from "../../data/connection-request.dto";
import { UserCheckService } from "../../../../user/services/user-check/user-check.service";
export declare class ConnectionRequestCreateController {
    private getService;
    private checkService;
    private createService;
    private connectionCheckService;
    private userCheckService;
    constructor(getService: ConnectionRequestGetService, checkService: ConnectionRequestCheckService, createService: ConnectionRequestCreateService, connectionCheckService: ConnectionCheckService, userCheckService: UserCheckService);
    createConnectionRequest(connectionRequestDto: ConnectionRequestDto, requesterId: number, requesterRole: RoleEnum): Promise<import(".prisma/client").connectionRequest>;
}
