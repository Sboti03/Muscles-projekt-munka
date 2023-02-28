import { Test, TestingModule } from '@nestjs/testing';
import { MealGetService } from './meal-convert.service';

describe('MealConvertService', () => {
  let service: MealGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealGetService],
    }).compile();

    service = module.get<MealGetService>(MealGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
