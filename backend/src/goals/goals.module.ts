import { Module } from '@nestjs/common';
import { GoalCreateController } from './controllers/goal-create/goal-create.controller';
import { GoalUpdateController } from './controllers/goal-update/goal-update.controller';
import { GoalDeleteController } from './controllers/goal-delete/goal-delete.controller';
import { GoalGetController } from './controllers/goal-get/goal-get.controller';
import { GoalsGetService } from './controllers/goals-get/goals-get.service';
import { GoalsUpdateService } from './controllers/goals-update/goals-update.service';
import { GoalsUpdateService } from './services/goals-update/goals-update.service';
import { GoalsGetService } from './services/goals-get/goals-get.service';
import { GoalsConvertService } from './services/goals-convert/goals-convert.service';

@Module({
  controllers: [GoalCreateController, GoalUpdateController, GoalDeleteController, GoalGetController],
  providers: [GoalsGetService, GoalsUpdateService, GoalsConvertService]
})
export class GoalsModule {}
