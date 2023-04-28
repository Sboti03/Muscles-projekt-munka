import { FoodGetService } from "../../services/food-get/food-get.service";
import SearchFoodQuery from "../../dto/SearchFood.query";
export declare class FoodGetController {
    private foodGetService;
    constructor(foodGetService: FoodGetService);
    getAllFood(): Promise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
    searchFood(searchFoodQuery: SearchFoodQuery): Promise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
}
