import { Test, TestingModule } from '@nestjs/testing';
import { ProfileDeleteService } from './profile-delete.service';

describe('ProfileDeleteService', () => {
  let service: ProfileDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileDeleteService],
    }).compile();

    service = module.get<ProfileDeleteService>(ProfileDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
