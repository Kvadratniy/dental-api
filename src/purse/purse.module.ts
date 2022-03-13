import { Module } from '@nestjs/common';
import { PurseService } from './services/purse.service';
import { PurseController } from './controllers/purse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purse } from './entities/purse.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Purse])
  ],
  providers: [PurseService],
  controllers: [PurseController],
  exports: [PurseService]
})
export class PurseModule {}
