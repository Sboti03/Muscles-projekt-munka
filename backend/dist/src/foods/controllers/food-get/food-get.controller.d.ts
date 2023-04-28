import { FoodGetService } from "../../services/food-get/food-get.service";
import { IdParam } from "../../../Common/params/id.param";
export declare class FoodGetController {
    private foodGetService;
    constructor(foodGetService: FoodGetService);
    getAllFood(): Promise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
    getFoodById(idParam: IdParam): Promise<import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    }>;
}
