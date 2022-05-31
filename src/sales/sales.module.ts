import { forwardRef, Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PurseModule } from 'src/purse/purse.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Sale]),
    PurseModule,
  ],
  controllers: [SalesController],
  providers: [SalesService]
})

// Продажи
export class SalesModule {}
