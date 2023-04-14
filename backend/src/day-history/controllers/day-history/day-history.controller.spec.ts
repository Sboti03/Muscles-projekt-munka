import { Test, TestingModule } from '@nestjs/testing';
import { DayHistoryController } from './day-history.controller';

describe('DayHistoryController', () => {
  let controller: DayHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayHistoryController],
    }).compile();

    controller = module.get<DayHistoryController>(DayHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
