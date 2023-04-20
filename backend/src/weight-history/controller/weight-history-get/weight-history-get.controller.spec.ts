import { Test, TestingModule } from '@nestjs/testing';
import { WeightHistoryGetController } from './weight-history-get.controller';

describe('WeightHistoryGetController', () => {
  let controller: WeightHistoryGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightHistoryGetController],
    }).compile();

    controller = module.get<WeightHistoryGetController>(WeightHistoryGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
