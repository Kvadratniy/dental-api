import { forwardRef, Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PurseModule } from 'src/purse/purse.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Sale]),
    PurseModule,
  ],
  controllers: [SalesController],
  providers: [SalesService]
})

// Продажи
export class SalesModule {}
