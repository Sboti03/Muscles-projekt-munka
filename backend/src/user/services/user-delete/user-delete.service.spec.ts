import { Test, TestingModule } from '@nestjs/testing';
import { UserDeleteService } from './user-delete.service';

describe('UserDeleteService', () => {
  let service: UserDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDeleteService],
    }).compile();

    service = module.get<UserDeleteService>(UserDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
