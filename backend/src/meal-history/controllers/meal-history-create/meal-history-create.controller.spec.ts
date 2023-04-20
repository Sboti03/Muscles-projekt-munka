import {MealHistoryCreateController} from "./meal-history-create.controller";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCreateService} from "../../../day-history/services/day-history-create/day-history-create.service";
import {MealCreateService} from "../../../meal/services/meal-create/meal-create.service";
import {MealGetService} from "../../../meal/services/meal-get/meal-get.service";
import {MealHistoryCreateService} from "../../services/meal-history-create/meal-history-create.service";
import {MealHistoryConvertService} from "../../services/meal-history-convert/meal-history-convert.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {FoodCheckService} from "../../../foods/services/food-check/food-check.service";
import {
    ConnectionCheckService
} from "../../../Connections/connection/services/connection-check/connection-check.service";
import {Test, TestingModule} from "@nestjs/testing";
import {MealModule} from "../../../meal/meal.module";
import {DayHistoryModule} from "../../../day-history/day-history.module";
import {ProfileModule} from "../../../profile/profile.module";
import {GoalsModule} from "../../../goals/goals.module";
import {WeightHistoryModule} from "../../../weight-history/weight-history.module";
import {FoodsModule} from "../../../foods/foods.module";
import {ConnectionModule} from "../../../Connections/connection/connection.module";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {MealHistoryDeleteService} from "../../services/meal-history-delete/meal-history-delete.service";
import {MealHistoryCheckService} from "../../services/meal-history-check/meal-history-check.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {CreateMealHistoryDto} from "../../dto/createMealHistory.dto";
import {PeriodNamesEnum} from "../../../Common/utils/PeriodNames";
import {NotFoundException} from "@nestjs/common";
import {PrismaError} from "prisma-error-enum";

describe('MealHistoryCreateController', () => {
    let controller: MealHistoryCreateController;
    let dayHistoryGetService: DayHistoryGetService;
    let dayHistoryCreateService: DayHistoryCreateService;
    let mealCreateService: MealCreateService;
    let mealGetService: MealGetService;
    let mealHistoryCreateService: MealHistoryCreateService;
    let mealHistoryConvertService: MealHistoryConvertService;
    let dayHistoryCheckService: DayHistoryCheckService;
    let foodCheckService: FoodCheckService;
    let connectionCheckService: ConnectionCheckService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MealModule, DayHistoryModule, ProfileModule, GoalsModule, WeightHistoryModule, FoodsModule, ConnectionModule, ConnectionModule],
            controllers: [MealHistoryCreateController],
            providers: [
                MealHistoryCreateService,
                PrismaService,
                DayHistoryGetService,
                DayHistoryCreateService,
                MealHistoryConvertService,
                MealHistoryGetService,
                MealHistoryDeleteService,
                MealHistoryCheckService,
            ],
        }).compile();
        controller = module.get<MealHistoryCreateController>(MealHistoryCreateController);
        dayHistoryGetService = module.get<DayHistoryGetService>(DayHistoryGetService);
        dayHistoryCreateService = module.get<DayHistoryCreateService>(DayHistoryCreateService);
        mealCreateService = module.get<MealCreateService>(MealCreateService);
        mealGetService = module.get<MealGetService>(MealGetService);
        mealHistoryCreateService = module.get<MealHistoryCreateService>(MealHistoryCreateService);
        mealHistoryConvertService = module.get<MealHistoryConvertService>(MealHistoryConvertService);
        dayHistoryCheckService = module.get<DayHistoryCheckService>(DayHistoryCheckService);
        foodCheckService = module.get<FoodCheckService>(FoodCheckService);
        connectionCheckService = module.get<ConnectionCheckService>(ConnectionCheckService);
        prismaService = module.get<PrismaService>(PrismaService);
    })

    const createDto: CreateMealHistoryDto = {
        userId: 1,
        amount: 100,
        date: new Date(),
        foodId: 1,
        periodName: PeriodNamesEnum.BREAKFAST
    }

    describe('create as coach', () => {
        it('should reject, no connection', async function () {
            prismaService.connections.findUniqueOrThrow = jest.fn().mockImplementationOnce(()=>{
                throw new Object({code: PrismaError.RecordsNotFound})
            })
            const result = controller.createMealHistory(RoleEnum.COACH, createDto, 10)
            await expect(result).rejects.toBeInstanceOf(NotFoundException)
        });

        it('should reject, no food', async function () {
            prismaService.connections.findUniqueOrThrow = jest.fn().mockImplementationOnce(()=>{
                return {accessAll: true}
            })
            prismaService.meals.create = jest.fn().mockImplementationOnce(()=> {
                throw new Object({code: PrismaError.RecordsNotFound})
            })
            const result = controller.createMealHistory(RoleEnum.COACH, createDto, 10)
            await expect(result).rejects.toBeInstanceOf(NotFoundException)
        })

        
    })

})