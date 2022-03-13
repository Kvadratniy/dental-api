import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DiscountsModule } from './discounts/discounts.module';
import { SalesModule } from './sales/sales.module';
import { PurseModule } from './purse/purse.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'aleksandrsafanov',
      password: 'developer228',
      database: 'dental',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule,
    DiscountsModule,
    SalesModule,
    PurseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
