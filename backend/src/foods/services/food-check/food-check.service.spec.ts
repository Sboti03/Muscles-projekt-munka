import { Test, TestingModule } from '@nestjs/testing';
import { FoodCheckService } from './food-check.service';

describe('FoodCheckService', () => {
  let service: FoodCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodCheckService],
    }).compile();

    service = module.get<FoodCheckService>(FoodCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
