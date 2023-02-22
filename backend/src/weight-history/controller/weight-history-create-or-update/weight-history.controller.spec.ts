import {Test, TestingModule} from '@nestjs/testing';
import {WeightHistoryController} from './weight-history.controller';

describe('WeightHistoryController', () => {
    let controller: WeightHistoryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WeightHistoryController],
        }).compile();

        controller = module.get<WeightHistoryController>(WeightHistoryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
