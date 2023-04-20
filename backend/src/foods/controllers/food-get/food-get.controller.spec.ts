import {FoodGetController} from "./food-get.controller";
import {FoodGetService} from "../../services/food-get/food-get.service";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {Test, TestingModule} from "@nestjs/testing";
import {Prisma} from "@prisma/client";

describe('FoodGetController', () => {
    let controller: FoodGetController;
    let service: FoodGetService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FoodGetController],
            providers: [PrismaService, FoodGetService]
        }).compile();
        controller = module.get<FoodGetController>(FoodGetController);
        service = module.get<FoodGetService>(FoodGetService);
        prismaService = module.get<PrismaService>(PrismaService);
    })

    describe('getAllFood', () => {
        const foods = [
            Object({foodId: 1, name: 'food1', calories: 100, protein: 10, fat: 10, carbs: 10, isDeleted: false}),
            Object({foodId: 2, name: 'food2', calories: 200, protein: 20, fat: 20, carbs: 20, isDeleted: false}),
            Object({foodId: 3, name: 'food3', calories: 300, protein: 30, fat: 30, carbs: 30, isDeleted: true}),
            Object({foodId: 4, name: 'food4', calories: 400, protein: 40, fat: 40, carbs: 40, isDeleted: false})
        ]

        it('should only return active food', async function () {
            prismaService.foods.findMany = jest.fn().mockImplementationOnce((args: Prisma.foodsFindManyArgs) => {
                return args.where
            })
            const result = await controller.getAllFood()
            expect(result).toEqual({isDeleted: false})
        });

        it('should return all food', async function () {

            prismaService.foods.findMany = jest.fn().mockResolvedValue(foods)
            const result = await controller.getAllFood()
            expect(result).toEqual(foods)
        });
    })
})