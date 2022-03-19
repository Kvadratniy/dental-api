import { Module } from '@nestjs/common';
import { PurseService } from './purse.service';
import { PurseController } from './purse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purse } from './entities/purse.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Purse])
  ],
  providers: [PurseService],
  controllers: [PurseController],
  exports: [
    PurseService
  ]
})

// Кошелек пользователя
export class PurseModule {}
