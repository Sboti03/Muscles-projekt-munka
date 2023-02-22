import { Test, TestingModule } from '@nestjs/testing';
import { MealConvertService } from './meal-convert.service';

describe('MealConvertService', () => {
  let service: MealConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealConvertService],
    }).compile();

    service = module.get<MealConvertService>(MealConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
