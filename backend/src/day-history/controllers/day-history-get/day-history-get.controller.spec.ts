import { Test, TestingModule } from '@nestjs/testing';
import { DayHistoryGetController } from './day-history-get.controller';

describe('DayHistoryGetController', () => {
  let controller: DayHistoryGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayHistoryGetController],
    }).compile();

    controller = module.get<DayHistoryGetController>(DayHistoryGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
