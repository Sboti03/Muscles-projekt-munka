import { Test, TestingModule } from '@nestjs/testing';
import { FoodDeleteService } from './food-delete.service';

describe('FoodDeleteService', () => {
  let service: FoodDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodDeleteService],
    }).compile();

    service = module.get<FoodDeleteService>(FoodDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
