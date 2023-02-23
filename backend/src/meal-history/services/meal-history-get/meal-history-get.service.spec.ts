import { Test, TestingModule } from '@nestjs/testing';
import { MealHistoryGetService } from './meal-history-get.service';

describe('MealHistoryGetService', () => {
  let service: MealHistoryGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealHistoryGetService],
    }).compile();

    service = module.get<MealHistoryGetService>(MealHistoryGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
