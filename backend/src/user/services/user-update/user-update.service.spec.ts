import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdateService } from './user-update.service';

describe('UserUpdateService', () => {
  let service: UserUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUpdateService],
    }).compile();

    service = module.get<UserUpdateService>(UserUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
