import { PrismaService } from "../../../../Common/utils/prirsma.service";
import { ConnectionRequestGetService } from "../connection-request-get/connection-request-get.service";
export declare class ConnectionRequestCheckService {
    private prismaService;
    private getService;
    constructor(prismaService: PrismaService, getService: ConnectionRequestGetService);
    checkExistingConnectionRequest(userId: number, coachId: number): Promise<boolean>;
    isSameRole(userId: number, userId2: number): Promise<boolean>;
}
