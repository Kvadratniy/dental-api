import { Module } from '@nestjs/common';
import { SalesController } from './controllers/sales.controller';
import { SalesService } from './services/sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
/**
 * Модуль продажи
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Sale])
  ],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
