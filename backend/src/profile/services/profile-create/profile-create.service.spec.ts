import { Test, TestingModule } from '@nestjs/testing';
import { ProfileCreateService } from './profile-create.service';

describe('ProfileCreateService', () => {
  let service: ProfileCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileCreateService],
    }).compile();

    service = module.get<ProfileCreateService>(ProfileCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
