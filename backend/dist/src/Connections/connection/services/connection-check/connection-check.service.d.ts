import { PrismaService } from "../../../../Common/utils/prirsma.service";
import { ConnectionGetService } from "../connection-get/connection-get.service";
export declare class ConnectionCheckService {
    private prismaService;
    private getService;
    constructor(prismaService: PrismaService, getService: ConnectionGetService);
    checkExistingConnection(userId: number, coachId: number): Promise<boolean>;
}
