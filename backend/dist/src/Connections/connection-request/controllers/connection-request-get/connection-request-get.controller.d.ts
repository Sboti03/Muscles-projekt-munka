import { ConnectionRequestGetService } from "../../services/connection-request-get/connection-request-get.service";
export declare class ConnectionRequestGetController {
    private getService;
    constructor(getService: ConnectionRequestGetService);
    createConnectionRequest(userId: number): Promise<import(".prisma/client").connectionRequest[]>;
}
