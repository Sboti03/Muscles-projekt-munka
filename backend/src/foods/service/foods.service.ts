import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../utils/prirsma.service";
import {FoodSearchParam} from "../FoodSearchParams.dto";

@Injectable()
export class FoodsService {
    constructor(private prismaService: PrismaService) {}
    getFoods(foodSearchParam: FoodSearchParam) {
        if(!foodSearchParam.minKcal) { foodSearchParam.minKcal = Number.MIN_VALUE }
        if(!foodSearchParam.maxKcal) { foodSearchParam.maxKcal = Number.MAX_VALUE }
        if(!foodSearchParam.minProtein) { foodSearchParam.minProtein = Number.MIN_VALUE }
        if(!foodSearchParam.maxProtein) { foodSearchParam.maxProtein = Number.MAX_VALUE }
        if(!foodSearchParam.minFat) { foodSearchParam.minFat = Number.MIN_VALUE }
        if(!foodSearchParam.maxFat) { foodSearchParam.maxFat = Number.MAX_VALUE }
        if(!foodSearchParam.maxSugar) { foodSearchParam.maxSugar = Number.MAX_VALUE }
        if(!foodSearchParam.minSugar) { foodSearchParam.minSugar = Number.MIN_VALUE }
        if(!foodSearchParam.minFiber) { foodSearchParam.minFiber = Number.MIN_VALUE }
        if(!foodSearchParam.maxFiber) { foodSearchParam.maxFiber = Number.MAX_VALUE }
        if(!foodSearchParam.minCarbohydrate) { foodSearchParam.minCarbohydrate = Number.MIN_VALUE }
        if(!foodSearchParam.maxCarbohydrate) { foodSearchParam.maxCarbohydrate = Number.MAX_VALUE }
        return this.prismaService.foods.findMany({
            where: {
                AND: [
                    {
                        name: { contains: foodSearchParam.name },},
                    {
                        kcal: { gt: foodSearchParam.minKcal } },
                    {
                        kcal: { lt: foodSearchParam.maxKcal } },
                    {
                        protein: { gt: foodSearchParam.minProtein } },
                    {
                        protein: { gt: foodSearchParam.maxProtein } },
                    {
                        fat: { lt: foodSearchParam.maxFat } },
                    {
                        fat: { gt: foodSearchParam.minFat } },
                    {
                        sugar: { gt: foodSearchParam.minSugar } },
                    {
                        sugar: { gt: foodSearchParam.maxSugar } },
                    {
                        fiber: { gt: foodSearchParam.minFiber } },
                    {
                        fiber: { gt: foodSearchParam.minFiber } },
                    {
                        carbohydrate: { gt: foodSearchParam.minCarbohydrate } },
                    {
                        carbohydrate: { gt: foodSearchParam.minCarbohydrate } },
                ]
            },
            include: {
                unit: true
            }
        })
    }
}
