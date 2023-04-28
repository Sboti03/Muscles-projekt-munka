import { PrismaService } from "../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class ProfileCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createProfile(profileCreateInput: Prisma.profileDataCreateInput): Prisma.Prisma__profileDataClient<import(".prisma/client").profileData, never>;
}
