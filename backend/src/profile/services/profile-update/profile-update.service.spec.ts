import { Test, TestingModule } from '@nestjs/testing';
import { ProfileUpdateService } from './profile-update.service';

describe('ProfileUpdateService', () => {
  let service: ProfileUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileUpdateService],
    }).compile();

    service = module.get<ProfileUpdateService>(ProfileUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
