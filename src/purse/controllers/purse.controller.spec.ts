import { Test, TestingModule } from '@nestjs/testing';
import { PurseController } from './purse.controller';

describe('PurseController', () => {
  let controller: PurseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurseController],
    }).compile();

    controller = module.get<PurseController>(PurseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
