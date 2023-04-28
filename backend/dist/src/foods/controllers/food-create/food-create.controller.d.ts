import { FoodCreateService } from "../../services/food-create/food-create.service";
import { FoodConvertService } from "../../services/food-convert/food-convert.service";
export declare class FoodCreateController {
    private foodCreateService;
    private convertService;
    constructor(foodCreateService: FoodCreateService, convertService: FoodConvertService);
}
