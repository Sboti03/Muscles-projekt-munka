import { Test, TestingModule } from '@nestjs/testing';
import { FoodUpdateController } from './food-update.controller';

describe('FoodUpdateController', () => {
  let controller: FoodUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodUpdateController],
    }).compile();

    controller = module.get<FoodUpdateController>(FoodUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
