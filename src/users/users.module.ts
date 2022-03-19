import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User as UserEntity } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PurseModule } from '../purse/purse.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
    PurseModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
