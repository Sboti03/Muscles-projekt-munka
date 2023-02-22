import { Test, TestingModule } from '@nestjs/testing';
import { FoodConvertService } from './food-convert.service';

describe('FoodConvertService', () => {
  let service: FoodConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodConvertService],
    }).compile();

    service = module.get<FoodConvertService>(FoodConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
