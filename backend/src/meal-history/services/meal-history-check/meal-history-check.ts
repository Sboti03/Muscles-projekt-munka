import {Injectable} from '@nestjs/common';
import {UpdateMealHistoryDTO} from "../../dto/updateMealHistoryDTO";


@Injectable()
export class MealHistoryCheckService {


   areThereAnyChangesOnUpdateMealHistoryDTO(updateMealHistoryDTO: UpdateMealHistoryDTO){
      if (updateMealHistoryDTO.isCompleted === undefined &&
         updateMealHistoryDTO.amount === undefined
      ) {
         return false
      }
      return true
   }
}
