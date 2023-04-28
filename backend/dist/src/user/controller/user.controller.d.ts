import { PrismaService } from "../../Common/utils/prirsma.service";
import { UserGetService } from "../services/user-get/user-get.service";
export declare class UserController {
    private prismaService;
    private userGetService;
    getAllUser(): Promise<(import(".prisma/client").users & {
        role: import(".prisma/client").roles;
    })[]>;
    constructor(prismaService: PrismaService, userGetService: UserGetService);
}
