import { Test, TestingModule } from '@nestjs/testing';
import { ProfileGetService } from './profile-get.service';

describe('ProfileGetService', () => {
  let service: ProfileGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileGetService],
    }).compile();

    service = module.get<ProfileGetService>(ProfileGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
