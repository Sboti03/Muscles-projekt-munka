import { RoleEnum } from "../../Common/Role/utils/roles";
export declare class UpdateMealDto {
    foodId?: number;
    amount?: number;
    addedBy?: RoleEnum;
    completed?: boolean;
}
