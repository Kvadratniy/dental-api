import { Module, forwardRef } from '@nestjs/common';
import { PurseService } from './purse.service';
import { PurseController } from './purse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purse } from './entities/purse.entity';
import { Writeoff } from './entities/writeoff.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Purse]),
    TypeOrmModule.forFeature([Writeoff]),
  ],
  providers: [PurseService],
  controllers: [PurseController],
  exports: [
    PurseService
  ]
})

// Кошелек пользователя
export class PurseModule {}
