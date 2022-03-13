import { Module } from '@nestjs/common';
import { DiscountsService } from './services/discounts.service';
import { DiscountsController } from './controllers/discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([Discount])
  ],
  providers: [DiscountsService],
  controllers: [DiscountsController]
})
export class DiscountsModule {}