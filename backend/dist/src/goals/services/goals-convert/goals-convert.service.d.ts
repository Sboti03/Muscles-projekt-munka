import { GoalsUpdateDto } from "../../goals-update.dto";
import { Prisma } from "@prisma/client";
export declare class GoalsConvertService {
    convertGoalsUpdateDtoToInput(goalsUpdateDto: GoalsUpdateDto): Prisma.goalsUpdateInput;
}
