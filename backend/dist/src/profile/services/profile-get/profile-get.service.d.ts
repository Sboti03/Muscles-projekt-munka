import { PrismaService } from "../../../Common/utils/prirsma.service";
import { RoleEnum } from "../../../Common/Role/utils/roles";
export declare class ProfileGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getProfileIdByUserId(userId: number): import(".prisma/client").Prisma.Prisma__profileDataClient<{
        profileId: number;
    }, never>;
    getAllProfileDataByProfileId(profileId: number): import(".prisma/client").Prisma.Prisma__profileDataClient<import(".prisma/client").profileData, never>;
    getAllProfileAllData(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").profileData & {
        user: import(".prisma/client").users & {
            role: import(".prisma/client").roles;
        };
    })[]>;
    getAllProfile(): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        profileId: number;
        firstName: string;
        lastName: string;
        male: boolean;
    }[]>;
    getProfileDataByProfileId(profileId: number): import(".prisma/client").Prisma.Prisma__profileDataClient<{
        userId: number;
        registrationDate: Date;
        firstName: string;
        birthDay: Date;
        lastName: string;
        height: number;
        male: boolean;
    }, never>;
    getAllProfilesByName(name: string): import(".prisma/client").Prisma.PrismaPromise<{
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        profileId: number;
        firstName: string;
        lastName: string;
        male: boolean;
    }[]>;
    getProfiles(name: string, role: RoleEnum, profileId: number): Promise<{
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        profileId: number;
        firstName: string;
        lastName: string;
        male: boolean;
    }[]>;
    getProfilesByName(name: string, role?: RoleEnum, profileId?: number): import(".prisma/client").Prisma.PrismaPromise<{
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        profileId: number;
        firstName: string;
        lastName: string;
        male: boolean;
    }[]>;
}
