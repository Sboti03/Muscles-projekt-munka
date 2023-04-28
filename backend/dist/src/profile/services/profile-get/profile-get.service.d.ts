import { PrismaService } from "../../../Common/utils/prirsma.service";
import { RoleEnum } from "../../../Common/Role/utils/roles";
export declare class ProfileGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getProfileIdByUserId(userId: number): import(".prisma/client").Prisma.Prisma__profileDataClient<{
        profileId: number;
    }, never>;
    getAllProfileDataByProfileId(profileId: number): import(".prisma/client").Prisma.Prisma__profileDataClient<import(".prisma/client").profileData, never>;
    getAllProfileAllData(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").profileData[]>;
    getAllProfile(): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        firstName: string;
        lastName: string;
        profileId: number;
    }[]>;
    getProfileDataByProfileId(profileId: number): import(".prisma/client").Prisma.Prisma__profileDataClient<{
        userId: number;
        registrationDate: Date;
        firstName: string;
        birthDay: Date;
        lastName: string;
        height: number;
    }, never>;
    getUserProfiles(name: string): import(".prisma/client").Prisma.PrismaPromise<{
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        firstName: string;
        lastName: string;
    }[]>;
    getCoachProfiles(name: string): import(".prisma/client").Prisma.PrismaPromise<{
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        firstName: string;
        lastName: string;
    }[]>;
    getAdminProfiles(name: string): import(".prisma/client").Prisma.PrismaPromise<{
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        firstName: string;
        lastName: string;
    }[]>;
    getProfileByName(name: string, role?: RoleEnum): import(".prisma/client").Prisma.PrismaPromise<{
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        firstName: string;
        lastName: string;
    }[]>;
}
