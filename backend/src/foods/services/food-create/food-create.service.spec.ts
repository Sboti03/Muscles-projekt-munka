import { Test, TestingModule } from '@nestjs/testing';
import { FoodCreateService } from './food-create.service';

describe('FoodCreateService', () => {
  let service: FoodCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodCreateService],
    }).compile();

    service = module.get<FoodCreateService>(FoodCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
