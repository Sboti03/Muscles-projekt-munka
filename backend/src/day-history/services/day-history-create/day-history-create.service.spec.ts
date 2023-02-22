import { Test, TestingModule } from '@nestjs/testing';
import { DayHistoryCreateService } from './day-history-create.service';

describe('DayHistoryService', () => {
  let service: DayHistoryCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayHistoryCreateService],
    }).compile();

    service = module.get<DayHistoryCreateService>(DayHistoryCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
