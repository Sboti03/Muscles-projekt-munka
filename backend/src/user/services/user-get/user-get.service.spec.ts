import { Test, TestingModule } from '@nestjs/testing';
import { UserGetService } from './user-get.service';

describe('UserGetService', () => {
  let service: UserGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGetService],
    }).compile();

    service = module.get<UserGetService>(UserGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
