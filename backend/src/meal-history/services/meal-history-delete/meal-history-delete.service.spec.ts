import { Test, TestingModule } from '@nestjs/testing';
import { MealHistoryDeleteService } from './meal-history-delete.service';

describe('MealHistoryDeleteService', () => {
  let service: MealHistoryDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealHistoryDeleteService],
    }).compile();

    service = module.get<MealHistoryDeleteService>(MealHistoryDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
