import { Test, TestingModule } from '@nestjs/testing';
import { DayHistoryGetService } from './day-history-get.service';

describe('DayHistoryGetService', () => {
  let service: DayHistoryGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayHistoryGetService],
    }).compile();

    service = module.get<DayHistoryGetService>(DayHistoryGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
