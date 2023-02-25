import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionCheckService } from './connection-check.service';

describe('ConnectionCheckService', () => {
  let service: ConnectionCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionCheckService],
    }).compile();

    service = module.get<ConnectionCheckService>(ConnectionCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
