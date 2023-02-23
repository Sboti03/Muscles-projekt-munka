import { Test, TestingModule } from '@nestjs/testing';
import { MealHistoryController } from './meal-history.controller';

describe('MealHistoryController', () => {
  let controller: MealHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealHistoryController],
    }).compile();

    controller = module.get<MealHistoryController>(MealHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
