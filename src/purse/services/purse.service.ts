import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purse } from '../entities/purse.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class PurseService {
  constructor(
    @InjectRepository(Purse) private repository: Repository<Purse>
  ) {}

  createPurse(user: User) {
    const purse = new Purse();
    purse.user = user;
    const newPurse = this.repository.create(purse);
    return this.repository.save(newPurse);
  }
}
