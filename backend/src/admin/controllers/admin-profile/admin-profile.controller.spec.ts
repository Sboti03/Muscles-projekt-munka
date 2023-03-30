import { Test, TestingModule } from '@nestjs/testing';
import { AdminProfileController } from './admin-profile.controller';

describe('AdminProfileController', () => {
  let controller: AdminProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProfileController],
    }).compile();

    controller = module.get<AdminProfileController>(AdminProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
