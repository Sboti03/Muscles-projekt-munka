import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateMealHistoryDTO{
   @IsString()
   @IsNotEmpty()
   periodName: string;
   @IsDate()
   @IsNotEmpty()
   date: Date;
   @IsNumber()
   @IsNotEmpty()
   foodId: number;
   @IsNumber()
   @IsNotEmpty()
   amount: number;
}