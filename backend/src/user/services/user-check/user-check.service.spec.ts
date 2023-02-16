import { Test, TestingModule } from '@nestjs/testing';
import { UserCheckService } from './get-user-data.service';

describe('UserCheckService', () => {
  let service: UserCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCheckService],
    }).compile();

    service = module.get<UserCheckService>(UserCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
