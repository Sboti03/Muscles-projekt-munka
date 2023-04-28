import { FoodDeleteService } from "../../services/food-delete/food-delete.service";
import { FoodCheckService } from "../../services/food-check/food-check.service";
export declare class FoodDeleteController {
    private foodDeleteService;
    private checkService;
    constructor(foodDeleteService: FoodDeleteService, checkService: FoodCheckService);
}
