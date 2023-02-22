import { Test, TestingModule } from '@nestjs/testing';
import { FoodCreateController } from './food-create.controller';

describe('FoodCreateController', () => {
  let controller: FoodCreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodCreateController],
    }).compile();

    controller = module.get<FoodCreateController>(FoodCreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
