import { Test, TestingModule } from '@nestjs/testing';
import { DayHistoryService } from './day-history.service';

describe('DayHistoryService', () => {
  let service: DayHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayHistoryService],
    }).compile();

    service = module.get<DayHistoryService>(DayHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
