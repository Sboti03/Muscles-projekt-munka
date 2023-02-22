import { Test, TestingModule } from '@nestjs/testing';
import { MealCreateService } from './meal-create.service';

describe('MealService', () => {
  let service: MealCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealCreateService],
    }).compile();

    service = module.get<MealCreateService>(MealCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
