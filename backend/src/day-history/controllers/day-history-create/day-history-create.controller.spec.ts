import { Test, TestingModule } from '@nestjs/testing';
import { DayHistoryCreateController } from './day-history-create.controller';

describe('DayHistoryCreateController', () => {
  let controller: DayHistoryCreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayHistoryCreateController],
    }).compile();

    controller = module.get<DayHistoryCreateController>(DayHistoryCreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
