import { ConnectionGetService } from "../../services/connection-get/connection-get.service";
import { IdParam } from "../../../../Common/params/id.param";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { ConnectionCheckService } from "../../services/connection-check/connection-check.service";
export declare class ConnectionGetController {
    private conGetService;
    private connectionCheckService;
    constructor(conGetService: ConnectionGetService, connectionCheckService: ConnectionCheckService);
    getAllConnection(userId: number): Promise<{
        user: {
            email: string;
            profileData: {
                registrationDate: Date;
                firstName: string;
                birthDay: Date;
                lastName: string;
                height: number;
            };
            userId: number;
        };
    }[]>;
    getConnectionById(idParam: IdParam, currentUserId: number, role: RoleEnum): Promise<{
        email: string;
        profileData: {
            registrationDate: Date;
            firstName: string;
            birthDay: Date;
            lastName: string;
            height: number;
        };
        userId: number;
    }>;
}
