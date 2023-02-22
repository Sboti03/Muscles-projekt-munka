import { Test, TestingModule } from '@nestjs/testing';
import { FoodGetService } from './food-get.service';

describe('FoodGetService', () => {
  let service: FoodGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodGetService],
    }).compile();

    service = module.get<FoodGetService>(FoodGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
