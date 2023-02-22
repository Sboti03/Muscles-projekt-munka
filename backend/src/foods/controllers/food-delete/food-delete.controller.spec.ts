import { Test, TestingModule } from '@nestjs/testing';
import { FoodDeleteController } from './food-delete.controller';

describe('FoodDeleteController', () => {
  let controller: FoodDeleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodDeleteController],
    }).compile();

    controller = module.get<FoodDeleteController>(FoodDeleteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
