import { Test, TestingModule } from '@nestjs/testing';
import { FoodUpdateService } from './food-update.service';

describe('FoodUpdateService', () => {
  let service: FoodUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodUpdateService],
    }).compile();

    service = module.get<FoodUpdateService>(FoodUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
