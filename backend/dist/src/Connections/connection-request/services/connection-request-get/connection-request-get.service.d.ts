import { PrismaService } from "../../../../Common/utils/prirsma.service";
import { RoleEnum } from "../../../../Common/Role/utils/roles";
import { Prisma } from "@prisma/client";
export declare class ConnectionRequestGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllByUserId(userId: number): Prisma.PrismaPromise<import(".prisma/client").connectionRequest[]>;
    getConnectionRequestIdByIds(userId: number, coachId: number): Prisma.Prisma__connectionRequestClient<import(".prisma/client").connectionRequest, never>;
    getUserAndCoachId(id: number, requesterId: number, requesterRole: RoleEnum): {
        userId: number;
        coachId: number;
    };
    getConnectionRequestCreateInput(userId: number, requesterId: number, coachId: number): Prisma.connectionRequestCreateInput;
    getConnectionRequestById(connectionRequestId: number): Prisma.Prisma__connectionRequestClient<import(".prisma/client").connectionRequest, never>;
}
