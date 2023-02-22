import { Test, TestingModule } from '@nestjs/testing';
import { WeightHistoryUpdateService } from './weight-history-update.service';

describe('WeightHistoryUpdateService', () => {
  let service: WeightHistoryUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightHistoryUpdateService],
    }).compile();

    service = module.get<WeightHistoryUpdateService>(WeightHistoryUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
