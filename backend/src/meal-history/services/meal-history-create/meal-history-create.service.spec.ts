import { Test, TestingModule } from '@nestjs/testing';
import { MealHistoryCreateService } from './meal-history-create.service';

describe('MealHistoryCreateService', () => {
  let service: MealHistoryCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealHistoryCreateService],
    }).compile();

    service = module.get<MealHistoryCreateService>(MealHistoryCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
