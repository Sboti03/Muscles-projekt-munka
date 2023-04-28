import { GoalsGetService } from "../../services/goals-get/goals-get.service";
export declare class GoalsGetController {
    private goalsGetService;
    constructor(goalsGetService: GoalsGetService);
    getGoalsById(profileId: number): Promise<import(".prisma/client").goals>;
}
