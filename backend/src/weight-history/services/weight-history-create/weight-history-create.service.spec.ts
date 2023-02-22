import { Test, TestingModule } from '@nestjs/testing';
import { WeightHistoryCreateService } from './weight-history-create.service';

describe('WeightHService', () => {
  let service: WeightHistoryCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightHistoryCreateService],
    }).compile();

    service = module.get<WeightHistoryCreateService>(WeightHistoryCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
