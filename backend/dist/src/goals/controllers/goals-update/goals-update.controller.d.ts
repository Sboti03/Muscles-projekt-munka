import { GoalsUpdateService } from "../../services/goals-update/goals-update.service";
import { GoalsUpdateDto } from "../../goals-update.dto";
import { GoalsConvertService } from "../../services/goals-convert/goals-convert.service";
import { GoalsCheckService } from "../../services/goals-check/goals-check.service";
export declare class GoalsUpdateController {
    private updateService;
    private convertService;
    private checkService;
    constructor(updateService: GoalsUpdateService, convertService: GoalsConvertService, checkService: GoalsCheckService);
    updateProfile(profileId: number, goalsUpdateDto: GoalsUpdateDto): Promise<import(".prisma/client").goals>;
}
