import { AdminFoodService } from "../../services/admin-food/admin-food.service";
import { IdParam } from "../../../Common/params/id.param";
import { FoodCheckService } from "../../../foods/services/food-check/food-check.service";
import { FoodCreateDto } from "../../../foods/dto/food-create.dto";
import { FoodConvertService } from "../../../foods/services/food-convert/food-convert.service";
import { FoodCreateService } from "../../../foods/services/food-create/food-create.service";
import { FoodUpdateDto } from "../../../foods/dto/food-update.dto";
import { FoodUpdateService } from "../../../foods/services/food-update/food-update.service";
export declare class AdminFoodController {
    private adminFoodService;
    private foodService;
    private convertService;
    private foodCreateService;
    private foodUpdateService;
    constructor(adminFoodService: AdminFoodService, foodService: FoodCheckService, convertService: FoodConvertService, foodCreateService: FoodCreateService, foodUpdateService: FoodUpdateService);
    deleteFood(idParam: IdParam): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
    unDeleteFood(idParam: IdParam): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
    createFood(foodCreateDto: FoodCreateDto): Promise<import(".prisma/client").foods>;
    updateFoodById(idParam: IdParam, foodUpdateDto: FoodUpdateDto): Promise<import(".prisma/client").foods>;
}
