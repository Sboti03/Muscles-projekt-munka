import { PrismaService } from "../../../../Common/utils/prirsma.service";
export declare class ConnectionGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getConnectionByIds(userId: number, coachId: number): import(".prisma/client").Prisma.Prisma__connectionsClient<import(".prisma/client").connections, never>;
    getAllConnection(id: number): import(".prisma/client").Prisma.PrismaPromise<{
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
    getUser(id: number): import(".prisma/client").Prisma.Prisma__usersClient<{
        email: string;
        profileData: {
            registrationDate: Date;
            firstName: string;
            birthDay: Date;
            lastName: string;
            height: number;
        };
        userId: number;
    }, never>;
}
