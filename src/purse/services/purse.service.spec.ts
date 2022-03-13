import { Test, TestingModule } from '@nestjs/testing';
import { PurseService } from './purse.service';

describe('PurseService', () => {
  let service: PurseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurseService],
    }).compile();

    service = module.get<PurseService>(PurseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
