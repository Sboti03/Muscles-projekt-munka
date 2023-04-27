import { AdminFoodService } from "../../services/admin-food/admin-food.service";
import { IdParam } from "../../../Common/params/id.param";
import { FoodCheckService } from "../../../foods/services/food-check/food-check.service";
import { FoodCreateDto } from "../../../foods/dto/food-create.dto";
import { FoodConvertService } from "../../../foods/services/food-convert/food-convert.service";
import { FoodCreateService } from "../../../foods/services/food-create/food-create.service";
import { FoodUpdateDto } from "../../../foods/dto/food-update.dto";
import { FoodUpdateService } from "../../../foods/services/food-update/food-update.service";
import SearchFoodQuery from "../../../foods/dto/SearchFood.query";
export declare class AdminFoodController {
    private adminFoodService;
    private foodService;
    private convertService;
    private foodCreateService;
    private foodUpdateService;
    constructor(adminFoodService: AdminFoodService, foodService: FoodCheckService, convertService: FoodConvertService, foodCreateService: FoodCreateService, foodUpdateService: FoodUpdateService);
    deleteFood(idParam: IdParam): Promise<import(".prisma/client").foods>;
    unDeleteFood(idParam: IdParam): Promise<import(".prisma/client").foods>;
    createFood(foodCreateDto: FoodCreateDto): Promise<import(".prisma/client").foods>;
    updateFoodById(idParam: IdParam, foodUpdateDto: FoodUpdateDto): Promise<import(".prisma/client").foods>;
    getAllFood(searchFoodQuery: SearchFoodQuery): Promise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
    getFoodById(idParam: IdParam): Promise<import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    }>;
}
