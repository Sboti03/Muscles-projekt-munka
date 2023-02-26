import { Test, TestingModule } from '@nestjs/testing';
import {GoalsCheckService} from "./goals-check.service";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {GoalsGetService} from "../goals-get/goals-get.service";

describe('GoalsCheckService', () => {
  let service: GoalsCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalsCheckService, PrismaService, GoalsGetService],
    }).compile();

    service = module.get<GoalsCheckService>(GoalsCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('test', ()=> {
    it('should be good', async function () {
      const result = await service.checkGoalsUpdateDto({proteinPerDay: 40, carbohydratesPerDay: 30, targetWeight: 200}, 5)
      console.log(result)
    });
  })

});
