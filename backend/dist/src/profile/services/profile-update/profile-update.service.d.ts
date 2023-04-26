import { PrismaService } from "../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class ProfileUpdateService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    updateProfile(profileId: number, newProfileData: Prisma.profileDataUpdateInput): Prisma.Prisma__profileDataClient<import(".prisma/client").profileData, never>;
}
