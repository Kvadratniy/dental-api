import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User} from './entities/user.entity';
import { PurseModule } from '../purse/purse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PurseModule
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
