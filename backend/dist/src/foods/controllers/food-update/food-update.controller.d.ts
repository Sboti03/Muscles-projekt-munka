import { FoodUpdateService } from "../../services/food-update/food-update.service";
import { FoodConvertService } from "../../services/food-convert/food-convert.service";
export declare class FoodUpdateController {
    private foodUpdateService;
    private foodConvertService;
    constructor(foodUpdateService: FoodUpdateService, foodConvertService: FoodConvertService);
}
