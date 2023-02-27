import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionCreateService } from './connection-create.service';

describe('ConnectionCreateService', () => {
  let service: ConnectionCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionCreateService],
    }).compile();

    service = module.get<ConnectionCreateService>(ConnectionCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
