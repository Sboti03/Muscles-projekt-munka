import { Test, TestingModule } from '@nestjs/testing';
import { WeightHistoryGetService } from './weight-history-get.service';

describe('WeightHistoryGetService', () => {
  let service: WeightHistoryGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightHistoryGetService],
    }).compile();

    service = module.get<WeightHistoryGetService>(WeightHistoryGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
