import { PrismaService } from "../../../Common/utils/prirsma.service";
import { GoalsUpdateDto } from "../../goals-update.dto";
import { GoalsGetService } from "../goals-get/goals-get.service";
export declare class GoalsCheckService {
    private prismaService;
    private goalsGetService;
    constructor(prismaService: PrismaService, goalsGetService: GoalsGetService);
    checkGoalsUpdateDto(goalsUpdateDto: GoalsUpdateDto, profileId: number): Promise<boolean>;
}
