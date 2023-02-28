import { Test, TestingModule } from '@nestjs/testing';
import { MealHistoryConvertService } from './meal-history-convert.service';

describe('MealHistoryConvertService', () => {
  let service: MealHistoryConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealHistoryConvertService],
    }).compile();

    service = module.get<MealHistoryConvertService>(MealHistoryConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
