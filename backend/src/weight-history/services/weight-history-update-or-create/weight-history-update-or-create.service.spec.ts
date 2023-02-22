import { Test, TestingModule } from '@nestjs/testing';
import { WeightHistoryUpdateOrCreateService } from './weight-history-update-or-create.service';

describe('WeightHistoryUpdateService', () => {
  let service: WeightHistoryUpdateOrCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightHistoryUpdateOrCreateService],
    }).compile();

    service = module.get<WeightHistoryUpdateOrCreateService>(WeightHistoryUpdateOrCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
