import { Test, TestingModule } from '@nestjs/testing';
import { FoodGetController } from './food-get.controller';

describe('FoodGetController', () => {
  let controller: FoodGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodGetController],
    }).compile();

    controller = module.get<FoodGetController>(FoodGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
