import { Test, TestingModule } from '@nestjs/testing';
import { ProfileImageController } from './profile-image.controller';

describe('ProfileImageController', () => {
  let controller: ProfileImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileImageController],
    }).compile();

    controller = module.get<ProfileImageController>(ProfileImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
