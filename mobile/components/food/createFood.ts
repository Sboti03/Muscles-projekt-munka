import Food, {UnitsEnum} from "./food";

export default function createFood(): Food {
    return {
        name: 'Chicken breast',
        kcal: 165,
        carbohydrate: 0,
        fiber: 0,
        protein: 31,
        unit: UnitsEnum.GRAM,
        perUnit: 100,
        sugar: 0,
        saturatedFat: 1,
        polyunsaturatedFat: 0.75,
        monounsaturatedFat: 1.25,
        fat: 3.58
    };
}